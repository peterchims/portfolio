import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../content/projects';
import { sectionIntros } from '../../content/site';
import type { Project } from '../../types/portfolio';
import { Chip } from '../ui/Chip';
import { ProjectCover } from '../ui/ProjectCover';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';
import { SpotlightCard } from '../ui/SpotlightCard';

function Index({ n }: { n: number }) {
  return (
    <span className="font-mono text-xs text-text-faint">
      {String(n).padStart(2, '0')}
    </span>
  );
}

function Arrow() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-faint transition-all duration-300 group-hover/spot:border-accent group-hover/spot:bg-accent group-hover/spot:text-accent-contrast">
      <ArrowUpRight size={16} />
    </span>
  );
}

function FeaturedCard({ project, n }: { project: Project; n: number }) {
  return (
    <Reveal>
      <SpotlightCard hue={project.hue} className="md:grid md:grid-cols-2">
        <div className="relative min-h-[13rem] overflow-hidden">
          <ProjectCover
            project={project}
            preferImage
            className="absolute inset-0 h-full w-full transition-transform duration-[600ms] ease-out-expo group-hover/spot:scale-[1.04]"
          />
        </div>
        <Link to={`/work/${project.slug}`} className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <Index n={n} />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                {project.category} · {project.year}
              </span>
            </span>
            <Arrow />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-text">{project.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
            Read case study
            <ArrowUpRight size={14} className="transition-transform group-hover/spot:translate-x-0.5" />
          </span>
        </Link>
      </SpotlightCard>
    </Reveal>
  );
}

function GridCard({ project, n, delay }: { project: Project; n: number; delay: number }) {
  return (
    <Reveal as="li" delay={delay}>
      <SpotlightCard hue={project.hue} className="h-full">
        <Link to={`/work/${project.slug}`} className="flex h-full flex-col">
          <div className="relative aspect-[16/10] overflow-hidden">
            <ProjectCover
              project={project}
              preferImage
              className="absolute inset-0 h-full w-full transition-transform duration-[600ms] ease-out-expo group-hover/spot:scale-[1.04]"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-3">
                <Index n={n} />
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-faint">
                  {project.category} · {project.year}
                </span>
              </span>
              <Arrow />
            </div>
            <h3 className="mt-4 text-base font-semibold text-text">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent">
              Read case study
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover/spot:translate-x-0.5"
              />
            </span>
          </div>
        </Link>
      </SpotlightCard>
    </Reveal>
  );
}

export function Work() {
  const [lead, ...rest] = projects;

  return (
    <Section id="work">
      <SectionHeader {...sectionIntros.work} />

      <div className="mt-10 space-y-5">
        <FeaturedCard project={lead} n={1} />
        <ul className="grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <GridCard key={project.slug} project={project} n={index + 2} delay={index} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
