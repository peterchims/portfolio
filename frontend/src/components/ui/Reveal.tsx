import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplies a small base delay. */
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section';
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delay * 0.06, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
