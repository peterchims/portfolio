import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

const SLIDE_MS = 6500;

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface HeroPhotoBackgroundProps {
  images: { src: string; alt: string }[];
  className?: string;
}

/**
 * A slow crossfading, Ken-Burns-style photo slideshow for the hero backdrop —
 * reads like a background video without shipping one. Freezes on the first
 * frame under prefers-reduced-motion.
 */
export function HeroPhotoBackground({ images, className }: HeroPhotoBackgroundProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduced, images.length]);

  const active = images[index];

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#05060b]', className)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={active.src}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <motion.img
            src={active.src}
            alt=""
            className="h-full w-full object-cover object-top"
            initial={reduced ? false : { scale: 1 }}
            animate={reduced ? undefined : { scale: 1.09 }}
            transition={{ duration: (SLIDE_MS + 1600) / 1000, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Grounding gradient so foreground text stays legible over any frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060b]/85 via-[#05060b]/55 to-[#05060b]/92" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060b] via-transparent to-[#05060b]/40" />
      <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_10%,transparent_35%,rgba(0,0,0,0.6)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL }}
      />
    </div>
  );
}
