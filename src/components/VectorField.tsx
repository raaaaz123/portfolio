import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { projects } from '../data/projects';

/**
 * The hero is an embedding space: every shipped project is a cluster of
 * points, the pointer is the query vector, and the k nearest points are
 * retrieved each frame. The cluster that wins the vote is the "match".
 */

export interface PointerState {
  /** Pointer in normalised device coords, or null when not over the hero. */
  ndc: { x: number; y: number } | null;
  lastMove: number;
}

export interface MatchReadout {
  project: number;
  score: number;
  x: number;
  y: number;
}

const K = 8;
const NOISE = 700;

// Deterministic, so the space looks the same on every visit.
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const gauss = (rand: () => number) => {
  const u = Math.max(rand(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
};

const usersOf = (u?: string) => (u ? parseFloat(u) * (/k/i.test(u) ? 1000 : 1) : 300);

function buildSpace(density: number) {
  const rand = mulberry32(7);
  const centers: THREE.Vector3[] = [];

  // Spread cluster centres on a jittered ellipse so none overlap.
  projects.forEach((_, i) => {
    const a = (i / projects.length) * Math.PI * 2 + rand() * 0.35;
    const r = 0.55 + rand() * 0.45;
    centers.push(new THREE.Vector3(Math.cos(a) * 7.4 * r, Math.sin(a) * 3.4 * r, (rand() - 0.5) * 4));
  });

  const counts = projects.map((p) =>
    Math.round((70 + Math.log10(usersOf(p.users)) * 38) * density),
  );
  const noise = Math.round(NOISE * density);
  const total = counts.reduce((a, b) => a + b, 0) + noise;

  const positions = new Float32Array(total * 3);
  const cluster = new Float32Array(total);
  const seed = new Float32Array(total);

  let o = 0;
  counts.forEach((n, c) => {
    const spread = 0.35 + rand() * 0.25;
    for (let j = 0; j < n; j++, o++) {
      positions[o * 3] = centers[c].x + gauss(rand) * spread;
      positions[o * 3 + 1] = centers[c].y + gauss(rand) * spread;
      positions[o * 3 + 2] = centers[c].z + gauss(rand) * spread;
      cluster[o] = c;
      seed[o] = rand();
    }
  });
  for (let j = 0; j < noise; j++, o++) {
    positions[o * 3] = (rand() - 0.5) * 22;
    positions[o * 3 + 1] = (rand() - 0.5) * 9;
    positions[o * 3 + 2] = (rand() - 0.5) * 7;
    cluster[o] = -1;
    seed[o] = rand();
  }

  return { positions, cluster, seed, total };
}

const vertex = /* glsl */ `
  uniform vec3 uQuery;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uCluster;
  attribute float aCluster;
  attribute float aSeed;
  varying float vNear;
  varying float vHot;
  varying float vSeed;

  void main() {
    vec3 p = position;
    p += 0.06 * vec3(sin(uTime * 0.6 + aSeed * 40.0), cos(uTime * 0.5 + aSeed * 31.0), 0.0);
    vec4 world = modelMatrix * vec4(p, 1.0);
    float d = distance(world.xyz, uQuery);
    vNear = smoothstep(2.4, 0.0, d);
    vHot = (aCluster == uCluster) ? 1.0 : 0.0;
    vSeed = aSeed;
    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    float size = 2.6 + 7.0 * vNear * vNear + 2.2 * vHot + aSeed * 1.8;
    gl_PointSize = size * uPixelRatio * (14.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uHot;
  uniform vec3 uNear;
  varying float vNear;
  varying float vHot;
  varying float vSeed;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.1, r);
    vec3 col = mix(uBase, uHot, vHot * 0.85);
    col = mix(col, uNear, vNear);
    float alpha = a * (0.5 + 0.3 * vSeed + 0.4 * vHot + 0.6 * vNear);
    gl_FragColor = vec4(col, alpha);
  }
`;

function Space({
  pointer,
  onMatch,
  still,
  density,
}: {
  pointer: React.MutableRefObject<PointerState>;
  onMatch: (m: MatchReadout) => void;
  still: boolean;
  density: number;
}) {
  const group = useRef<THREE.Group>(null);
  const { camera, size, gl } = useThree();
  const space = useMemo(() => buildSpace(density), [density]);

  const uniforms = useMemo(
    () => ({
      uQuery: { value: new THREE.Vector3(0, 0, 0) },
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uCluster: { value: -2 },
      uBase: { value: new THREE.Color('#7FB35A') },
      uHot: { value: new THREE.Color('#F2F7D8') },
      uNear: { value: new THREE.Color('#C8F031') },
    }),
    [gl],
  );

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(K * 2 * 3), 3));
    return g;
  }, []);

  // Scratch objects, reused every frame.
  const scratch = useMemo(
    () => ({
      raycaster: new THREE.Raycaster(),
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      target: new THREE.Vector3(),
      query: new THREE.Vector3(),
      v: new THREE.Vector3(),
      ndc: new THREE.Vector2(),
      bestD: new Float32Array(K),
      bestI: new Int32Array(K),
      votes: new Float32Array(projects.length),
      lastReport: 0,
      lastProject: -1,
    }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const s = scratch;
    uniforms.uTime.value = still ? 0 : t;

    // Fit the space to narrow screens.
    const aspect = size.width / size.height;
    const fit = Math.min(1, aspect / 1.55);
    const g = group.current!;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x || fit, fit, 0.1));

    // Query target: the pointer, or a slow orbit when idle / on touch.
    const p = pointer.current;
    const idle = !p.ndc || performance.now() - p.lastMove > 3500;
    if (!idle && p.ndc) {
      s.ndc.set(p.ndc.x, p.ndc.y);
      s.raycaster.setFromCamera(s.ndc, camera);
      s.raycaster.ray.intersectPlane(s.plane, s.target);
    } else {
      const tt = still ? 1.3 : t * 0.22;
      s.target.set(Math.sin(tt) * 4.6 * fit, Math.sin(tt * 1.7) * 2.2, 0);
    }
    s.query.lerp(s.target, 1 - Math.pow(0.0015, delta));
    uniforms.uQuery.value.copy(s.query);

    if (!still) {
      g.rotation.y = Math.sin(t * 0.07) * 0.28 + s.query.x * 0.025;
      g.rotation.x = Math.cos(t * 0.05) * 0.08 - s.query.y * 0.02;
    }
    g.updateMatrixWorld();

    // Brute-force kNN — a few thousand points is nothing for a CPU.
    s.bestD.fill(Infinity);
    s.bestI.fill(-1);
    const pos = space.positions;
    const m = g.matrixWorld;
    for (let i = 0; i < space.total; i++) {
      s.v.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]).applyMatrix4(m);
      const d = s.v.distanceToSquared(s.query);
      if (d >= s.bestD[K - 1]) continue;
      let j = K - 1;
      while (j > 0 && s.bestD[j - 1] > d) {
        s.bestD[j] = s.bestD[j - 1];
        s.bestI[j] = s.bestI[j - 1];
        j--;
      }
      s.bestD[j] = d;
      s.bestI[j] = i;
    }

    // Draw query → neighbour edges, and let the neighbours vote on a project.
    const line = lineGeo.attributes.position as THREE.BufferAttribute;
    s.votes.fill(0);
    let meanD = 0;
    for (let k = 0; k < K; k++) {
      const i = s.bestI[k];
      if (i < 0) continue;
      s.v.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]).applyMatrix4(m);
      line.setXYZ(k * 2, s.query.x, s.query.y, s.query.z);
      line.setXYZ(k * 2 + 1, s.v.x, s.v.y, s.v.z);
      const c = space.cluster[i];
      const d = Math.sqrt(s.bestD[k]);
      meanD += d / K;
      if (c >= 0) s.votes[c] += 1 / (0.2 + d);
    }
    line.needsUpdate = true;

    let winner = -1;
    let best = 0;
    s.votes.forEach((v, c) => {
      if (v > best) {
        best = v;
        winner = c;
      }
    });
    uniforms.uCluster.value = winner;

    // Throttle React updates to ~8/s.
    const now = performance.now();
    if (now - s.lastReport > 120 || winner !== s.lastProject) {
      s.lastReport = now;
      s.lastProject = winner;
      onMatch({
        project: winner,
        score: Math.max(0, Math.min(0.99, 1 - meanD / 2.2)),
        x: s.query.x,
        y: s.query.y,
      });
    }
  });

  return (
    <>
      <group ref={group}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[space.positions, 3]} />
            <bufferAttribute attach="attributes-aCluster" args={[space.cluster, 1]} />
            <bufferAttribute attach="attributes-aSeed" args={[space.seed, 1]} />
          </bufferGeometry>
          <shaderMaterial
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#FFE44A" transparent opacity={0.55} />
      </lineSegments>
    </>
  );
}

export default function VectorField(props: {
  pointer: React.MutableRefObject<PointerState>;
  onMatch: (m: MatchReadout) => void;
  still: boolean;
}) {
  const narrow = typeof window !== 'undefined' && window.innerWidth < 700;
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop={props.still ? 'demand' : 'always'}
      style={{ pointerEvents: 'none' }}
    >
      <Space {...props} density={narrow ? 0.55 : 1} />
    </Canvas>
  );
}
