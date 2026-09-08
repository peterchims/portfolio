import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../../content/profile';
import { hero } from '../../content/site';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';
import { buttonClass } from '../ui/Button';
import { Container } from '../ui/Container';
import { motion } from 'framer-motion';

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

  return (
    <section id="home" className="border-b border-border py-24 sm:py-32">
      <Container>
        <motion.p
          {...anim(0)}
          className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          {...anim(0.05)}
          className="mt-6 max-w-4xl text-display-lg font-semibold"
        >
          {profile.headline}
        </motion.h1>

        <motion.p {...anim(0.1)} className="mt-6 max-w-2xl text-lg text-text-muted">
          {profile.summary}
        </motion.p>

        <motion.div {...anim(0.15)} className="mt-9 flex flex-wrap items-center gap-3">
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

        <motion.div {...anim(0.2)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
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

        <motion.dl
          {...anim(0.28)}
          className="mt-16 grid gap-8 border-t border-border pt-8 sm:grid-cols-3"
        >
          {hero.proofPoints.map((point, index) => (
            <div key={point.label} className={cn(index > 0 && 'sm:border-l sm:border-border sm:pl-8')}>
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
