import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Accent hue for the spotlight glow + hover edge. */
  hue?: number;
  as?: 'div' | 'article' | 'li';
}

/**
 * A card that lifts on hover and carries a cursor-following glow.
 * One pointer listener, no re-renders — position is pushed to CSS variables.
 */
export function SpotlightCard({
  children,
  className,
  hue = 224,
  as: Tag = 'div',
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (event: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      style={{ '--spot': `hsl(${hue} 85% 62% / 0.16)` } as CSSProperties}
      className={cn(
        'group/spot relative overflow-hidden rounded-2xl border border-border bg-surface',
        'transition-[transform,box-shadow,border-color] duration-300 ease-out-expo',
        'hover:-translate-y-1 hover:border-border-strong hover:shadow-lg',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:opacity-0 before:transition-opacity before:duration-300 group-hover/spot:before:opacity-100',
        'before:bg-[radial-gradient(circle_260px_at_var(--mx,50%)_var(--my,50%),var(--spot),transparent_65%)]',
        className,
      )}
    >
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </Tag>
  );
}
