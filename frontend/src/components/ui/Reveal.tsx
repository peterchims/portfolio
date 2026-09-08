import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplies a small base delay. */
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section' | 'ul' | 'ol';
  /** When true, children with `data-reveal-item` animate in sequence. */
  stagger?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function Reveal({ children, className, delay = 0, as = 'div', stagger }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  if (stagger) {
    return (
      <Tag
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.08, delayChildren: delay * 0.06 }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: delay * 0.06, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** A child of a <Reveal stagger> container. */
export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  if (reduced) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag className={className} variants={item} transition={{ duration: 0.5, ease: EASE }}>
      {children}
    </Tag>
  );
}
