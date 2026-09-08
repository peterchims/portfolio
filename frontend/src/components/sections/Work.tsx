import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../content/projects';
import { sectionIntros } from '../../content/site';
import type { Project } from '../../types/portfolio';
import { Chip } from '../ui/Chip';
import { ProjectCover } from '../ui/ProjectCover';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

const cardShell =
  'group block overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md';

function Meta({ project }: { project: Project }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.16em] text-text-faint">
      {project.category} · {project.year}
    </span>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <Link
        to={`/work/${project.slug}`}
        className={`${cardShell} md:grid md:grid-cols-2 md:min-h-[21rem]`}
      >
        <div className="relative min-h-[12rem]">
          <ProjectCover
            project={project}
            preferImage
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <Meta project={project} />
            <ArrowUpRight
              size={18}
              className="text-text-faint transition-colors group-hover:text-accent"
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-text">{project.title}</h3>
          <p className="mt-3 text-sm text-text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
          <span className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
            Read case study <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function GridCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal as="li" delay={delay}>
      <Link to={`/work/${project.slug}`} className={`${cardShell} flex h-full flex-col`}>
        <ProjectCover project={project} preferImage className="aspect-[16/10]" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-4">
            <Meta project={project} />
            <ArrowUpRight
              size={18}
              className="text-text-faint transition-colors group-hover:text-accent"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-text">{project.title}</h3>
          <p className="mt-2 text-sm text-text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
          <span className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
            Read case study <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Work() {
  const [lead, ...rest] = projects;

  return (
    <Section id="work">
      <SectionHeader {...sectionIntros.work} />

      <div className="mt-12 space-y-5">
        <FeaturedCard project={lead} />
        <ul className="grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <GridCard key={project.slug} project={project} delay={index} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
