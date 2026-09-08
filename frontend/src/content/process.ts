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
    title: 'Languages',
    items: ['TypeScript', 'JavaScript (ES6+)', 'Go'],
  },
  {
    title: 'Frontend',
    items: ['Next.js', 'React', 'Angular', 'Tailwind CSS', 'Sass'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Go services', 'REST', 'GraphQL', 'WebSockets'],
  },
  {
    title: 'Data & infra',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Job queues / workers'],
  },
  {
    title: 'Tooling & testing',
    items: ['Vite', 'Webpack', 'Jest', 'Cypress', 'Git'],
  },
];
