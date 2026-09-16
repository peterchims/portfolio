import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Accent hue for the spotlight glow. */
  hue?: number;
}

/**
 * A card that tilts toward the cursor in 3D and carries a spotlight glow —
 * the higher-motion sibling of SpotlightCard, reserved for the in-progress
 * work grid so it reads distinctly from the shipped case studies.
 */
export function TiltCard({ children, className, hue = 224 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.5 });

  const onMove = (event: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    if (reduced) return;
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 10);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        {
          rotateX: srx,
          rotateY: sry,
          transformPerspective: 900,
          '--spot': `hsl(${hue} 85% 62% / 0.18)`,
        } as CSSProperties
      }
      className={cn(
        'group/tilt relative overflow-hidden rounded-2xl border border-border bg-surface',
        'transition-[border-color,box-shadow] duration-300 will-change-transform',
        'hover:border-border-strong hover:shadow-lg',
        'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:opacity-0 before:transition-opacity before:duration-300 group-hover/tilt:before:opacity-100',
        'before:bg-[radial-gradient(circle_220px_at_var(--mx,50%)_var(--my,50%),var(--spot),transparent_65%)]',
        '[&>*]:relative [&>*]:z-[1]',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
