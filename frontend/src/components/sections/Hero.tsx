import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { profile } from '../../content/profile';
import { projects } from '../../content/projects';
import { hero } from '../../content/site';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';
import { buttonClass } from '../ui/button-classes';
import { Container } from '../ui/Container';
import { ProjectCover } from '../ui/ProjectCover';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const anim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  const feature = projects.find((p) => p.image) ?? projects[0];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-border py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-96 bg-[radial-gradient(50%_100%_at_50%_0%,var(--accent-surface),transparent_70%)]"
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <motion.p
              {...anim(0)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...anim(0.05)}
              className="mt-6 text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.025em]"
            >
              {profile.headline}
            </motion.h1>

            <motion.p {...anim(0.1)} className="mt-6 max-w-xl text-lg text-text-muted">
              {profile.summary}
            </motion.p>

            <motion.div {...anim(0.15)} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={`/${hero.primaryCta.href}`} className={buttonClass('primary', 'lg')}>
                {hero.primaryCta.label}
                <ArrowRight size={18} />
              </Link>
              <a
                href={hero.secondaryCta.href}
                className={buttonClass('secondary', 'lg')}
                target="_blank"
                rel="noreferrer"
              >
                {hero.secondaryCta.label}
                <Download size={17} />
              </a>
            </motion.div>

            <motion.div {...anim(0.2)} className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-muted underline-offset-4 hover:text-text hover:underline"
                >
                  {social.label}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 0.2, ease: EASE },
                })}
            className="hidden lg:block"
            aria-hidden
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
              <div className="flex items-center gap-1.5 border-b border-border bg-bg-subtle px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="ml-3 truncate font-mono text-[0.7rem] text-text-faint">
                  {feature.liveUrl ?? `${feature.slug}.app`}
                </span>
              </div>
              <ProjectCover
                project={feature}
                preferImage
                variant="hero"
                className="aspect-[16/11]"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-text-faint">
              {feature.title} · {feature.category}
            </p>
          </motion.div>
        </div>

        <motion.dl
          {...anim(0.3)}
          className="mt-16 grid gap-8 border-t border-border pt-8 sm:grid-cols-3"
        >
          {hero.proofPoints.map((point, index) => (
            <div
              key={point.label}
              className={cn(index > 0 && 'sm:border-l sm:border-border sm:pl-8')}
            >
              <dt className="text-sm text-text-faint">{point.label}</dt>
              <dd className="mt-1 font-display text-xl font-semibold text-text">
                {point.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
