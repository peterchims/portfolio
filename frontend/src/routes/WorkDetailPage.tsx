import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getAdjacentProjects, getProject } from '../content/projects';
import { siteMeta } from '../content/site';
import { Seo } from '../lib/seo';
import { Chip } from '../components/ui/Chip';
import { Container } from '../components/ui/Container';
import { Prose } from '../components/ui/Prose';

export function WorkDetailPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <article className="py-14 sm:py-20">
      <Seo
        title={`${project.title} — ${siteMeta.title}`}
        description={project.summary}
        path={`/work/${project.slug}`}
      />

      <Container>
        <Link
          to="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text"
        >
          <ArrowLeft size={15} />
          All work
        </Link>

        <header className="mt-8 border-b border-border pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-4 text-display-md font-semibold">{project.title}</h1>
          <p className="mt-4 max-w-prose text-lg text-text-muted">{project.summary}</p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div>
            <Prose>
              <h3>The problem</h3>
              <p>{project.caseStudy.problem}</p>
              <h3>Approach</h3>
              <p>{project.caseStudy.approach}</p>
              <h3>Key decisions</h3>
              <ul>
                {project.caseStudy.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
              <h3>Outcome</h3>
              <p>{project.caseStudy.outcome}</p>
              <h3>Highlights</h3>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Prose>
          </div>

          <aside>
            <div className="sticky top-24 rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-text-faint">
                At a glance
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-text-faint">Role</dt>
                  <dd className="mt-1 text-text">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-text-faint">Year</dt>
                  <dd className="mt-1 text-text">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-text-faint">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </dd>
                </div>
              </dl>

              {(project.liveUrl || project.codeUrl) && (
                <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      View live <ExternalLink size={14} />
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      View source <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>

        <nav
          className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          aria-label="More projects"
        >
          {previous ? (
            <Link
              to={`/work/${previous.slug}`}
              className="rounded-xl border border-border p-4 transition-colors hover:border-border-strong"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-text-faint">
                <ArrowLeft size={13} /> Previous
              </span>
              <span className="mt-1 block text-sm font-medium text-text">{previous.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="rounded-xl border border-border p-4 text-right transition-colors hover:border-border-strong sm:justify-self-end"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-text-faint">
                Next <ArrowRight size={13} />
              </span>
              <span className="mt-1 block text-sm font-medium text-text">{next.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </nav>
      </Container>
    </article>
  );
}
