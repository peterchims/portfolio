import type { ProcessStep } from '../types/portfolio';

export const processSteps: ProcessStep[] = [
  {
    title: 'Scope from the outcome',
    description:
      'Start at the problem and the user outcome — not the stack. Translate vague requirements into concrete screens, contracts, and delivery priorities.',
  },
  {
    title: 'Draw the boundaries',
    description:
      'Define the data model, the API surface, and where the synchronous request path ends and async work begins. Redis and queues get planned in, not bolted on.',
  },
  {
    title: 'Build both sides',
    description:
      'Typed frontend, resilient API, and the workers behind them — shipped together so the seams are tested, not assumed.',
  },
  {
    title: 'Harden for real load',
    description:
      'Caching, rate limiting, graceful degradation, Core Web Vitals, and the deployment path. Leave documentation instead of tribal knowledge.',
  },
];
