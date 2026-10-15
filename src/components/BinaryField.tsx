import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * The page backdrop: a slow, deep field of 0s and 1s drifting downwards.
 * Glyphs flip now and then, a few carry the link colour, and the whole field
 * leans towards the pointer. Everything runs in one Points draw call.
 */

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** "15 17 20" (a CSS channel triplet) → THREE.Color */
const cssColor = (name: string) => {
  const [r, g, b] = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  return new THREE.Color(r / 255, g / 255, b / 255);
};

/** A 2×1 atlas: "0" on the left half, "1" on the right. */
const makeAtlas = () => {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.font = '600 50px "JetBrains Mono", ui-monospace, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('0', 32, 34);
  ctx.fillText('1', 96, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.anisotropy = 4;
  return tex;
};

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uWorld;
  uniform vec2 uPointer;
  uniform float uSize;
  uniform float uDpr;
  attribute vec3 aSeed; // x: speed, y: flip phase, z: accent roll
  varying float vGlyph;
  varying float vAlpha;
  varying float vAccent;

  void main() {
    vec3 p = position;
    // Drift down and wrap; deeper glyphs move slower.
    float depth = (p.z + 6.0) / 6.0;            // 0 far .. 1 near
    p.y = fract(p.y - uTime * aSeed.x * (0.35 + depth * 0.65) + 0.5) - 0.5;
    // Fade in at the top and out at the bottom so the wrap is never seen.
    float edge = smoothstep(0.5, 0.36, abs(p.y));
    p.x *= uWorld.x;
    p.y *= uWorld.y;
    // Near glyphs follow the pointer more: cheap parallax.
    p.xy += uPointer * (0.15 + depth * 0.6);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uDpr * (0.55 + depth * 0.6) / -mv.z;

    // Each glyph flips at its own, unhurried rhythm.
    float tick = floor(uTime * (0.15 + aSeed.y * 0.5) + aSeed.y * 40.0);
    vGlyph = step(0.5, fract(sin(tick * 12.9898 + aSeed.y * 78.233) * 43758.5453));

    float twinkle = 0.55 + 0.45 * sin(uTime * (0.4 + aSeed.y) + aSeed.y * 30.0);
    vAccent = step(0.965, aSeed.z);
    vAlpha = (0.25 + depth * 0.75) * twinkle * edge;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uAtlas;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  uniform float uOpacity;
  varying float vGlyph;
  varying float vAlpha;
  varying float vAccent;

  void main() {
    vec2 uv = vec2(gl_PointCoord.x * 0.5 + vGlyph * 0.5, 1.0 - gl_PointCoord.y);
    float a = texture2D(uAtlas, uv).a;
    if (a < 0.02) discard;
    vec3 col = mix(uInk, uAccent, vAccent);
    gl_FragColor = vec4(col, a * vAlpha * uOpacity * (1.0 + vAccent * 1.4));
  }
`;

const Field: React.FC<{ count: number; still: boolean }> = ({ count, still }) => {
  const { viewport, gl } = useThree();
  const pointer = useRef(new THREE.Vector2());
  const target = useMemo(() => new THREE.Vector2(), []);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = Math.random() - 0.5;
      pos[i * 3 + 1] = Math.random() - 0.5;
      pos[i * 3 + 2] = -Math.random() * 6;
      seed[i * 3] = 0.004 + Math.random() * 0.012;
      seed[i * 3 + 1] = Math.random();
      seed[i * 3 + 2] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWorld: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2() },
      uSize: { value: 150 },
      uDpr: { value: 1 },
      uAtlas: { value: makeAtlas() },
      uInk: { value: new THREE.Color() },
      uAccent: { value: new THREE.Color() },
      uOpacity: { value: 0.2 },
    }),
    [],
  );

  // Follow the theme: colours come from the same CSS variables as the page.
  useEffect(() => {
    const apply = () => {
      const dark = document.documentElement.classList.contains('dark');
      uniforms.uInk.value.copy(cssColor('--ink'));
      uniforms.uAccent.value.copy(cssColor('--link'));
      uniforms.uOpacity.value = dark ? 0.22 : 0.16;
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, [uniforms]);

  useEffect(() => {
    if (still) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / innerWidth - 0.5) * 2, -(e.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [still]);

  useEffect(
    () => () => {
      geometry.dispose();
      uniforms.uAtlas.value.dispose();
    },
    [geometry, uniforms],
  );

  useFrame((state, delta) => {
    const u = uniforms;
    // The far plane (z = -6) shows more of the world than z = 0; cover it.
    u.uWorld.value.set(viewport.width * 1.9, viewport.height * 1.9);
    u.uDpr.value = gl.getPixelRatio();
    if (still) {
      u.uTime.value = 12;
      return;
    }
    u.uTime.value = state.clock.elapsedTime;
    // Scrolling nudges the field too, so the page feels layered.
    const scroll = (window.scrollY / Math.max(1, innerHeight)) * 0.25;
    target.set(pointer.current.x * 0.35, pointer.current.y * 0.25 + scroll);
    u.uPointer.value.lerp(target, Math.min(1, delta * 2.5));
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

const BinaryField: React.FC = () => {
  const still = useMemo(reducedMotion, []);
  const count = useMemo(() => (innerWidth < 640 ? 520 : 1300), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        // Quieter behind the reading column, fuller towards the edges.
        maskImage: 'radial-gradient(ellipse 70% 65% at 50% 45%, rgb(0 0 0 / 0.35), #000 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 45%, rgb(0 0 0 / 0.35), #000 80%)',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={still ? 'demand' : 'always'}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Field count={count} still={still} />
      </Canvas>
    </div>
  );
};

export default BinaryField;
