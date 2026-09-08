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
        'scroll-mt-24 border-b border-border py-16 sm:py-24',
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
      <p className="flex items-center gap-2.5 font-mono text-kicker uppercase text-accent">
        <span className="h-px w-6 bg-accent/50" />
        {kicker}
      </p>
      <h2 className="mt-3.5 text-display-sm font-semibold">{title}</h2>
      {copy ? <p className="mt-3 text-sm leading-relaxed text-text-muted">{copy}</p> : null}
    </Reveal>
  );
}
