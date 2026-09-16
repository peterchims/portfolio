import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, label, summary, [role="button"], [data-cursor]';

/**
 * Replaces the OS pointer with a small dot that expands into a ring (and an
 * optional label from `data-cursor-text`) over interactive elements. Only
 * mounts on fine-pointer devices — touch stays untouched.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-ready');

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        INTERACTIVE_SELECTOR,
      );
      setHovering(Boolean(target));
      setLabel(target?.dataset.cursorText ?? null);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });

    return () => {
      document.documentElement.classList.remove('cursor-ready');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full border border-accent/70 bg-accent/10 backdrop-blur-[2px] transition-[width,height] duration-200 ease-out"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 64 : 28,
          height: hovering ? 64 : 28,
        }}
      >
        {label ? (
          <span className="whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.1em] text-accent">
            {label}
          </span>
        ) : null}
      </motion.div>
    </>
  );
}
