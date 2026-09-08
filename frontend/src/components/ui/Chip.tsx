import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-bg-subtle px-3 py-1 text-xs font-medium text-text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
