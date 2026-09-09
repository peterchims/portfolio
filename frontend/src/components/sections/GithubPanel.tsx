import { ArrowUpRight, Github } from 'lucide-react';
import { github } from '../../content/github';
import { Reveal } from '../ui/Reveal';

export function GithubPanel() {
  return (
    <Reveal className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-6 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text">
            <Github size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-text">On GitHub</p>
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-accent"
            >
              github.com/{github.user}
              <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {github.achievements.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-border bg-bg px-2.5 py-1 font-mono text-[0.68rem] text-text-muted"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-8 p-6 sm:px-8 md:grid-cols-2">
        <div>
          <p className="text-sm leading-relaxed text-text-muted">{github.blurb}</p>
          <p className="mt-5 font-mono text-kicker uppercase text-text-faint">Currently exploring</p>
          <ul className="mt-3 space-y-2">
            {github.exploring.map((item) => (
              <li key={item} className="relative pl-5 text-sm text-text-muted">
                <span className="absolute left-0 top-[0.5rem] h-1 w-1 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:border-l md:border-border md:pl-8">
          <p className="font-mono text-kicker uppercase text-text-faint">Building with</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {github.organizations.map((org) => (
              <span
                key={org}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-text-muted"
              >
                {org}
              </span>
            ))}
          </div>
          <a
            href={github.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            See the repositories
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </Reveal>
  );
}
