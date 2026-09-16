import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { profile } from '../../content/profile';
import { hero } from '../../content/site';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCountUp } from '../../hooks/useCountUp';
import { buttonClass } from '../ui/button-classes';
import { CinematicBackground } from '../ui/CinematicBackground';
import { Container } from '../ui/Container';
import { Magnetic } from '../ui/Magnetic';

const EASE = [0.16, 1, 0.3, 1] as const;

const secondaryCtaClass =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-6 text-[0.95rem] font-medium text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/[0.12] active:scale-[0.97] motion-reduce:active:scale-100';

function ProofStat({ value, label, index }: { value: string; label: string; index: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const { value: counted, ref } = useCountUp(match ? Number(match[1]) : 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className={index > 0 ? 'sm:border-l sm:border-white/15 sm:pl-8' : ''}
    >
      <dd ref={ref as never} className="font-display text-lg font-semibold text-white sm:text-xl">
        {match ? `${counted}${match[2]}` : value}
      </dd>
      <dt className="mt-1 text-sm text-white/50">{label}</dt>
    </motion.div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const words = profile.headline.split(' ');

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100vh] items-center overflow-hidden py-28"
      data-cursor
    >
      <CinematicBackground />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-kicker uppercase text-accent"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-5 text-display-lg font-semibold text-white">
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
            className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Magnetic className="max-sm:w-full">
              <Link
                to={`/${hero.primaryCta.href}`}
                className={buttonClass('primary', 'lg', 'max-sm:w-full')}
                data-cursor-text="View"
              >
                {hero.primaryCta.label}
                <ArrowRight size={17} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25} className="max-sm:w-full">
              <a
                href={hero.secondaryCta.href}
                className={secondaryCtaClass}
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
            className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {social.label}
              </a>
            ))}
          </motion.div>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl gap-8 border-t border-white/15 pt-7 sm:grid-cols-3">
          {hero.proofPoints.map((point, index) => (
            <ProofStat key={point.label} value={point.value} label={point.label} index={index} />
          ))}
        </dl>
      </Container>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute inset-x-0 bottom-8 flex justify-center text-white/50 transition-colors hover:text-white"
      >
        <ChevronDown size={22} className="animate-bounce motion-reduce:animate-none" />
      </motion.a>
    </section>
  );
}
