import { Github } from 'lucide-react';
import { github, githubImages } from '../../content/github';
import { Reveal } from '../ui/Reveal';

export function GithubPanel() {
  return (
    <Reveal className="mt-14 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text">
            <Github size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-text">On GitHub</p>
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-text-muted transition-colors hover:text-accent"
            >
              @{github.user}
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

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-text-muted">{github.blurb}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <img
          src={githubImages.stats}
          alt={`GitHub stats for @${github.user}`}
          loading="lazy"
          className="w-full rounded-xl border border-border bg-bg p-2"
        />
        <img
          src={githubImages.langs}
          alt="Most-used languages"
          loading="lazy"
          className="w-full rounded-xl border border-border bg-bg p-2"
        />
      </div>
      <img
        src={githubImages.streak}
        alt="GitHub contribution streak"
        loading="lazy"
        className="mt-4 w-full rounded-xl border border-border bg-bg p-2"
      />

      <div className="mt-6 border-t border-border pt-5">
        <p className="font-mono text-kicker uppercase text-text-faint">Contributing across</p>
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
      </div>
    </Reveal>
  );
}
