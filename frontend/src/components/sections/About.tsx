import { about } from '../../content/about';
import { profile } from '../../content/profile';
import { sectionIntros } from '../../content/site';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

export function About() {
  return (
    <Section id="about" tone="subtle">
      <SectionHeader kicker={sectionIntros.about.kicker} title={about.heading} />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        <Reveal className="max-w-prose space-y-4 text-[1.05rem] leading-[1.75] text-text-muted">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal
          as="section"
          className="h-max rounded-2xl border border-border bg-surface p-6"
          delay={1}
        >
          <h3 className="sr-only">Facts</h3>
          <dl className="space-y-4">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-text-faint">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-text">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Download résumé →
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
