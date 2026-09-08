import { cn } from '../../lib/cn';
import type { Project } from '../../types/portfolio';

function monogram(title: string) {
  const initials = title
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  return initials.slice(0, 3) || title.slice(0, 2).toUpperCase();
}

interface ProjectCoverProps {
  project: Pick<Project, 'title' | 'category' | 'hue' | 'image'>;
  className?: string;
  variant?: 'card' | 'hero';
  /** Render the real screenshot when the project has one. */
  preferImage?: boolean;
}

/**
 * A bespoke, deterministic cover for a project — jewel-toned gradient field,
 * concentric arcs, and a ghosted monogram. Consistent identity across the
 * grid without stock photography.
 */
export function ProjectCover({
  project,
  className,
  variant = 'card',
  preferImage = false,
}: ProjectCoverProps) {
  const { hue, title, category, image } = project;

  if (preferImage && image) {
    return (
      <div className={cn('relative overflow-hidden bg-surface-sunken', className)}>
        <img
          src={image}
          alt={`${title} — interface`}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
      </div>
    );
  }

  const base = `hsl(${hue} 42% 10%)`;
  const deep = `hsl(${hue} 48% 6%)`;
  const glow = `hsl(${hue} 78% 58% / 0.32)`;
  const line = 'rgba(255,255,255,0.06)';

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ background: `radial-gradient(120% 120% at 85% 0%, ${glow}, transparent 55%), linear-gradient(160deg, ${base}, ${deep})` }}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {[70, 130, 190, 250, 310].map((r) => (
          <circle key={r} cx="340" cy="20" r={r} stroke={line} strokeWidth="1" />
        ))}
        <path d="M0 210 L400 150" stroke={line} strokeWidth="1" />
        <path d="M0 235 L400 180" stroke={line} strokeWidth="1" />
      </svg>

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/55">
          {category}
        </span>
        <span
          className={cn(
            'font-display font-semibold leading-none text-white/10',
            variant === 'hero' ? 'text-[7rem] sm:text-[10rem]' : 'text-[4.5rem]',
          )}
        >
          {monogram(title)}
        </span>
      </div>
    </div>
  );
}
