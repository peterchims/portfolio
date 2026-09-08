import { cn } from '../../lib/cn';

/**
 * Slow-drifting colour field for the hero. Pure CSS animation, heavily
 * blurred, low opacity — reads as ambient light, not decoration.
 * Frozen under prefers-reduced-motion.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'aurora-root pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <div className="aurora-blob aurora-blob--1" />
      <div className="aurora-blob aurora-blob--2" />
      <div className="aurora-blob aurora-blob--3" />
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
