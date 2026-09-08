import type { Service } from '../types/portfolio';

export const services: Service[] = [
  {
    title: 'Frontend systems',
    description:
      'Responsive interfaces with clear hierarchy, considered pacing, and interaction design that serves the product instead of decorating it.',
    bullets: [
      'Design systems and reusable UI foundations',
      'React and TypeScript architecture',
      'Mobile-first execution with performance discipline',
    ],
  },
  {
    title: 'Backend delivery',
    description:
      'APIs, validation, and runtime safeguards that turn a polished frontend into a dependable application.',
    bullets: [
      'REST endpoints and contract shaping',
      'Validation, persistence, and request tracing',
      'Deployment-ready server workflows',
    ],
  },
  {
    title: 'Launch discipline',
    description:
      'I do not stop at UI polish. I wire the content, deployment path, and runtime behaviour needed to ship cleanly and evolve safely.',
    bullets: [
      'Production build flow and environment handling',
      'Content modelling for maintainable updates',
      'Clear handoff documentation and cleanup',
    ],
  },
];
