import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

/* Small interaction primitives shared across sections. */

/** Pulls its child toward the pointer while hovered. */
export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.35,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const still = !!useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const move = (e: React.PointerEvent) => {
    if (still || e.pointerType !== 'mouse') return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`inline-flex ${className ?? ''}`}
    >
      {children}
    </motion.span>
  );
};

/**
 * 3D tilt toward the pointer, with a glare that follows it.
 * Children can use `[transform:translateZ(..)]` to float above the card.
 */
export const Tilt: React.FC<{
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}> = ({ children, className, max = 10, glare = true }) => {
  const still = !!useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`;
  const [hover, setHover] = useState(false);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (still || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    setHover(false);
  };

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        onPointerMove={move}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative h-full"
      >
        {children}
        {glare && !still && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light transition-opacity duration-300"
            style={{ background: glareBg, opacity: hover ? 1 : 0, borderRadius: 'inherit' }}
          />
        )}
      </motion.div>
    </div>
  );
};

/** Scrambles between phrases like a terminal resolving output. */
export const Scramble: React.FC<{ phrases: string[]; className?: string; interval?: number }> = ({
  phrases,
  className,
  interval = 3200,
}) => {
  const still = !!useReducedMotion();
  const [text, setText] = useState(phrases[0]);
  const idx = useRef(0);

  useEffect(() => {
    if (still) return;
    const glyphs = '!<>-_\\/[]{}=+*^?#01';
    let raf = 0;
    const timer = setInterval(() => {
      idx.current = (idx.current + 1) % phrases.length;
      const target = phrases[idx.current];
      const start = performance.now();
      const dur = 700;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const reveal = Math.floor(t * target.length);
        let out = '';
        for (let i = 0; i < target.length; i++) {
          out +=
            i < reveal || target[i] === ' '
              ? target[i]
              : glyphs[Math.floor(Math.random() * glyphs.length)];
        }
        setText(out);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, interval);
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, [phrases, interval, still]);

  return (
    <span className={className} aria-live="off">
      {text}
    </span>
  );
};
