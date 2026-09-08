import type { ProjectFigure } from '../../types/portfolio';

interface FigureProps {
  figure: ProjectFigure;
  /** Hue for the placeholder tint when there is no screenshot. */
  hue?: number;
}

/**
 * A case-study figure. Renders the screenshot when one is provided, otherwise
 * a designed placeholder so the layout reads as intentional before assets land.
 */
export function Figure({ figure, hue = 224 }: FigureProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border">
      {figure.src ? (
        <img
          src={figure.src}
          alt={figure.alt}
          loading="lazy"
          className="w-full bg-surface-sunken object-cover"
        />
      ) : (
        <div
          className="relative flex aspect-[16/10] items-end p-6"
          style={{
            background: `radial-gradient(90% 90% at 85% 10%, hsl(${hue} 70% 55% / 0.28), transparent 55%), linear-gradient(160deg, hsl(${hue} 40% 12%), hsl(${hue} 46% 7%))`,
          }}
        >
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.5]"
            viewBox="0 0 400 250"
            fill="none"
            aria-hidden
          >
            <rect x="28" y="26" width="150" height="14" rx="4" fill="rgba(255,255,255,0.14)" />
            <rect x="28" y="52" width="90" height="10" rx="3" fill="rgba(255,255,255,0.09)" />
            <rect x="28" y="96" width="160" height="120" rx="8" fill="rgba(255,255,255,0.06)" />
            <rect x="208" y="96" width="164" height="56" rx="8" fill="rgba(255,255,255,0.06)" />
            <rect x="208" y="160" width="164" height="56" rx="8" fill="rgba(255,255,255,0.06)" />
          </svg>
          <span className="relative font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/60">
            {figure.alt}
          </span>
        </div>
      )}
      <figcaption className="border-t border-border bg-surface px-4 py-3 text-sm text-text-faint">
        {figure.caption}
      </figcaption>
    </figure>
  );
}
