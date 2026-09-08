import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { profile } from '../../content/profile';
import { projects } from '../../content/projects';
import { hero } from '../../content/site';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCountUp } from '../../hooks/useCountUp';
import { buttonClass } from '../ui/button-classes';
import { AuroraBackground } from '../ui/AuroraBackground';
import { Container } from '../ui/Container';
import { Magnetic } from '../ui/Magnetic';
import { ProjectCover } from '../ui/ProjectCover';

const EASE = [0.16, 1, 0.3, 1] as const;

function ProofStat({ value, label, index }: { value: string; label: string; index: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const { value: counted, ref } = useCountUp(match ? Number(match[1]) : 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className={index > 0 ? 'sm:border-l sm:border-border sm:pl-8' : ''}
    >
      <dd
        ref={ref as never}
        className="font-display text-lg font-semibold text-text sm:text-xl"
      >
        {match ? `${counted}${match[2]}` : value}
      </dd>
      <dt className="mt-1 text-sm text-text-faint">{label}</dt>
    </motion.div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const feature = projects.find((p) => p.image) ?? projects[0];
  const words = profile.headline.split(' ');

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-border py-20 sm:py-28"
    >
      <AuroraBackground />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-mono text-kicker uppercase text-accent"
            >
              {hero.eyebrow}
            </motion.p>

            <h1 className="mt-5 text-display-lg font-semibold">
              {words.map((word, index) => (
                <span key={`${word}-${index}`} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={reduced ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + index * 0.045, ease: EASE }}
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-5 max-w-lg text-base text-text-muted"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Link to={`/${hero.primaryCta.href}`} className={buttonClass('primary', 'lg')}>
                  {hero.primaryCta.label}
                  <ArrowRight size={17} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={hero.secondaryCta.href}
                  className={buttonClass('secondary', 'lg')}
                  target="_blank"
                  rel="noreferrer"
                >
                  {hero.secondaryCta.label}
                  <Download size={16} />
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
            >
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
                >
                  {social.label}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="hidden [perspective:1200px] lg:block"
            aria-hidden
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
              <div className="flex items-center gap-1.5 border-b border-border bg-bg-subtle px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-border-strong" />
                <span className="h-2 w-2 rounded-full bg-border-strong" />
                <span className="h-2 w-2 rounded-full bg-border-strong" />
                <span className="ml-3 truncate font-mono text-[0.68rem] text-text-faint">
                  {feature.liveUrl ?? `${feature.slug}.app`}
                </span>
              </div>
              <ProjectCover project={feature} preferImage variant="hero" className="aspect-[16/11]" />
            </div>
            <p className="mt-3 text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-faint">
              {feature.title} · {feature.category}
            </p>
          </motion.div>
        </div>

        <dl className="mt-14 grid gap-8 border-t border-border pt-7 sm:grid-cols-3">
          {hero.proofPoints.map((point, index) => (
            <ProofStat key={point.label} value={point.value} label={point.label} index={index} />
          ))}
        </dl>
      </Container>
    </section>
  );
}
