import { processSteps } from '../../content/process';
import { sectionIntros } from '../../content/site';
import { Reveal, RevealItem } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

export function Process() {
  return (
    <Section id="process">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeader {...sectionIntros.process} />
          <p className="mt-6 font-mono text-xs text-text-faint">
            {processSteps.length} steps · every project
          </p>
        </div>

        <Reveal as="ol" stagger className="relative">
          <span
            aria-hidden
            className="absolute bottom-6 left-[1.15rem] top-6 w-px bg-gradient-to-b from-border via-border to-transparent"
          />
          {processSteps.map((step, index) => (
            <RevealItem as="li" key={step.title}>
              <div className="group relative flex gap-6 pb-10 last:pb-0">
                <span className="relative z-[1] flex h-[2.4rem] w-[2.4rem] shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-xs text-text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-[0.95rem] font-semibold text-text">{step.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
