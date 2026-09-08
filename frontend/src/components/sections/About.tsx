import { about } from '../../content/about';
import { profile } from '../../content/profile';
import { sectionIntros } from '../../content/site';
import { cn } from '../../lib/cn';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';
import { GithubPanel } from './GithubPanel';
import { Stack } from './Stack';

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function Portrait({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface-sunken',
        className,
      )}
    >
      {profile.photoUrl ? (
        <img
          src={profile.photoUrl}
          alt={profile.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="bg-grid absolute inset-0 opacity-70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 60% at 30% 20%, var(--accent-surface), transparent 60%)',
            }}
          />
          <span className="absolute bottom-5 left-5 font-display text-6xl font-semibold text-text/15">
            {initials(profile.name)}
          </span>
        </>
      )}
    </div>
  );
}

export function About() {
  return (
    <Section id="about" tone="subtle">
      <SectionHeader kicker={sectionIntros.about.kicker} title={about.heading} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
        <Reveal className="max-w-xs">
          <Portrait />
        </Reveal>

        <div>
          <Reveal className="max-w-prose space-y-4 text-[0.95rem] leading-[1.72] text-text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal as="section" delay={1} className="mt-10">
            <h3 className="sr-only">Facts</h3>
            <dl className="grid gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-2">
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
      </div>

      <Stack />

      <GithubPanel />
    </Section>
  );
}
