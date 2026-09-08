import { services } from '../../content/services';
import { sectionIntros } from '../../content/site';
import { Reveal, RevealItem } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';
import { SpotlightCard } from '../ui/SpotlightCard';

const HUES = [200, 152, 42];

export function Services() {
  return (
    <Section id="services" tone="subtle">
      <SectionHeader {...sectionIntros.services} />

      <Reveal as="div" stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <RevealItem as="div" key={service.title}>
            <SpotlightCard hue={HUES[index % HUES.length]} className="h-full p-6">
              <span
                className="inline-flex h-9 items-center rounded-full border border-border px-3 font-mono text-xs text-text-faint"
                style={{ color: `hsl(${HUES[index % HUES.length]} 55% 55%)` }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-base font-semibold text-text">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="relative pl-5 text-sm text-text-muted">
                    <span
                      className="absolute left-0 top-[0.55rem] h-1 w-1 rounded-full"
                      style={{ background: `hsl(${HUES[index % HUES.length]} 60% 55%)` }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
