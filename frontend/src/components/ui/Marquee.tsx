import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/**
 * A seamless horizontal marquee. Renders the row twice and translates by
 * -50% so the loop is continuous. Pauses on hover, frozen for reduced motion.
 */
export function Marquee({
  items,
  className,
  speed = 32,
}: {
  items: ReactNode[];
  className?: string;
  speed?: number;
}) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden',
        '[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]',
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center gap-10 pr-10 motion-reduce:animate-none group-hover:[animation-play-state:paused]"
          style={{ animation: `marquee ${speed}s linear infinite` }}
        >
          {items.map((item, index) => (
            <li key={index} className="whitespace-nowrap text-sm text-text-faint">
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
