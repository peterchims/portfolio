import { processSteps, stackGroups } from '../../content/process';
import { sectionIntros } from '../../content/site';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

export function Process() {
  return (
    <Section id="process">
      <SectionHeader {...sectionIntros.process} />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <ol className="space-y-8">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index} className="flex gap-5">
              <span className="mt-0.5 font-mono text-sm text-text-faint">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-base font-semibold text-text">{step.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{step.description}</p>
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
    </Section>
  );
}
