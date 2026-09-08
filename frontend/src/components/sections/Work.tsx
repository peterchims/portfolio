import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../content/projects';
import { sectionIntros } from '../../content/site';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

export function Work() {
  return (
    <Section id="work">
      <SectionHeader {...sectionIntros.work} />

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index}>
            <Link
              to={`/work/${project.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-text-faint">
                  {project.category} · {project.year}
                </span>
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

              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Read case study
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
