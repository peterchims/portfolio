import { services } from '../../content/services';
import { sectionIntros } from '../../content/site';
import { Reveal, RevealItem } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

const HUES = [210, 268, 152, 42];

export function Services() {
  return (
    <Section id="services" tone="subtle">
      <SectionHeader {...sectionIntros.services} />

      <Reveal as="ol" stagger className="mt-12 border-t border-border">
        {services.map((service, index) => {
          const hue = HUES[index % HUES.length];
          return (
            <RevealItem as="li" key={service.title}>
              <div className="group grid gap-x-10 gap-y-4 border-b border-border py-8 transition-colors duration-300 hover:bg-surface/60 md:grid-cols-[8rem_1fr] md:py-10">
                <div className="flex items-start gap-4 md:flex-col md:gap-3">
                  <span
                    className="font-mono text-sm tabular-nums text-text-faint transition-colors duration-300 group-hover:text-[color:var(--hue)]"
                    style={{ ['--hue' as string]: `hsl(${hue} 60% 55%)` }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-semibold text-text md:text-[1.05rem]">
                    {service.title}
                  </h3>
                </div>

                <div className="md:pr-6">
                  <p className="max-w-xl text-sm leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-bg px-3 py-1 font-mono text-[0.7rem] text-text-muted transition-colors group-hover:border-border-strong"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </Reveal>
    </Section>
  );
}
