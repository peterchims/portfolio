import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Container } from './Container';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Alternate background for visual rhythm. */
  tone?: 'default' | 'subtle';
}

export function Section({ id, children, className, tone = 'default' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 border-b border-border py-20 sm:py-28',
        tone === 'subtle' && 'bg-bg-subtle',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  kicker: string;
  title: string;
  copy?: string;
}

export function SectionHeader({ kicker, title, copy }: SectionHeaderProps) {
  return (
    <Reveal className="max-w-prose">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{kicker}</p>
      <h2 className="mt-4 text-display-sm">{title}</h2>
      {copy ? <p className="mt-4 text-base text-text-muted">{copy}</p> : null}
    </Reveal>
  );
}
