import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface p-6 transition-colors',
        interactive && 'hover:border-border-strong',
        className,
      )}
    >
      {children}
    </div>
  );
}
