import type { ProcessStep, StackGroup } from '../types/portfolio';

export const processSteps: ProcessStep[] = [
  {
    title: 'Clarify the brief',
    description:
      'Translate vague requirements into concrete screens, contracts, and delivery priorities before writing implementation code.',
  },
  {
    title: 'Shape the system',
    description:
      'Define the content model, API boundaries, runtime safeguards, and component structure early so the work scales cleanly.',
  },
  {
    title: 'Ship with intent',
    description:
      'Build the interface, wire the backend, and remove dead weight so the result feels coherent instead of patched together.',
  },
  {
    title: 'Prepare for production',
    description:
      'Verify build paths, storage behaviour, and deployment instructions so the work is ready to run, not just ready to demo.',
  },
];

export const stackGroups: StackGroup[] = [
  {
    title: 'Interface',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    title: 'Backend',
    items: ['Node.js', '.NET', 'REST APIs', 'Validation', 'Request tracing'],
  },
  {
    title: 'Data & ops',
    items: ['PostgreSQL', 'MongoDB', 'Docker', 'Health checks', 'CI workflows'],
  },
  {
    title: 'Delivery',
    items: ['Git workflows', 'Refactors', 'Documentation', 'Production cleanup', 'Launch support'],
  },
];
