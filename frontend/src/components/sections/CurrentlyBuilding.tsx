import { ArrowUpRight, Sparkles } from 'lucide-react';
import { buildingProjects } from '../../content/building';
import { sectionIntros } from '../../content/site';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';
import { TiltCard } from '../ui/TiltCard';

function StatusPill({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-surface px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-accent motion-reduce:animate-none animate-ping" />
        <span className="absolute inset-0 rounded-full bg-accent" />
      </span>
      {status}
    </span>
  );
}

export function CurrentlyBuilding() {
  return (
    <Section id="building" tone="subtle">
      <SectionHeader {...sectionIntros.building} />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {buildingProjects.map((project, index) => (
          <Reveal as="li" delay={index} key={project.slug}>
            <TiltCard hue={project.hue} className="h-full">
              <div className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <StatusPill status={project.status} />
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                    {project.tagline}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text">{project.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-text-faint">
                  Building in public
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </ul>

      <Reveal
        delay={buildingProjects.length}
        className="mt-6 flex items-center gap-2 text-sm text-text-faint"
      >
        <Sparkles size={15} className="text-accent" />
        Plus several more in the pipeline — this list grows as they move into shipping shape.
      </Reveal>
    </Section>
  );
}
