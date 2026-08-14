import { useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Feeds the pointer position into `--mx` / `--my` on the hovered element so the
 * `.spotlight` gradient can track it. Pair with `className="spotlight"`.
 */
export const usePointerGlow = () => {
  const reduced = useReducedMotion();

  return useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    [reduced],
  );
};

export default usePointerGlow;
