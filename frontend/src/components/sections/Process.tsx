import { processSteps, stackGroups } from '../../content/process';
import { sectionIntros } from '../../content/site';
import { Chip } from '../ui/Chip';
import { Marquee } from '../ui/Marquee';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

const allTech = Array.from(new Set(stackGroups.flatMap((group) => group.items)));

export function Process() {
  return (
    <Section id="process">
      <SectionHeader {...sectionIntros.process} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <ol className="relative">
          <span
            aria-hidden
            className="absolute bottom-2 left-[0.6rem] top-2 w-px bg-border"
          />
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index} className="relative flex gap-5 pb-8 last:pb-0">
              <span className="relative z-[1] mt-0.5 flex h-[1.2rem] w-[1.2rem] shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg text-[0.6rem] font-semibold text-text-faint">
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-text">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {stackGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index}
              className="rounded-2xl border border-border bg-bg-subtle p-5"
            >
              <h3 className="text-sm font-semibold text-text">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-text-faint">
          Tools in rotation
        </p>
        <Marquee items={allTech.map((tech) => <span key={tech}>{tech}</span>)} />
      </div>
    </Section>
  );
}
