import { services } from '../../content/services';
import { sectionIntros } from '../../content/site';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

export function Services() {
  return (
    <Section id="services" tone="subtle">
      <SectionHeader {...sectionIntros.services} />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {services.map((service, index) => (
          <Reveal
            as="article"
            key={service.title}
            delay={index}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="text-base font-semibold text-text">{service.title}</h3>
            <p className="mt-3 text-sm text-text-muted">{service.description}</p>
            <ul className="mt-5 space-y-2.5">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="relative pl-5 text-sm text-text-muted">
                  <span className="absolute left-0 top-[0.55rem] h-1 w-1 rounded-full bg-accent" />
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
