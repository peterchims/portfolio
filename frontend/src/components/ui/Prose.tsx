import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/**
 * Long-form reading column for case studies. Deliberately narrow,
 * generous line-height, tokenised colours.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-prose text-[1.05rem] leading-[1.75] text-text-muted',
        '[&_h3]:mt-10 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-text',
        '[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2 [&_li]:pl-5 [&_li]:relative',
        "[&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:rounded-full [&_li]:before:bg-accent",
        '[&_strong]:text-text [&_strong]:font-semibold',
        className,
      )}
    >
      {children}
    </div>
  );
}
