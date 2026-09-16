import type { BuildingProject } from '../types/portfolio';

/**
 * Placeholder copy — swap in real descriptions, stack and status per
 * product as each build moves further along.
 */
export const buildingProjects: BuildingProject[] = [
  {
    slug: 'dexta-africa',
    title: 'Dexta Africa',
    tagline: 'Web platform',
    description:
      'A pan-African product platform in active development — the core surface and the backend underneath it are being built together before feature work locks in.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    status: 'In development',
    hue: 24,
  },
  {
    slug: 'vijadprojects',
    title: 'VijadProjects',
    tagline: 'Web platform',
    description:
      'A project and client management platform taking shape — the data model and workflows are being structured around how the team actually runs jobs.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    status: 'In development',
    hue: 200,
  },
  {
    slug: 'esocs',
    title: 'Esocs',
    tagline: 'Platform',
    description:
      'An early-stage build — architecture and core flows are being defined now, with the interface following once the domain model settles.',
    stack: ['React', 'TypeScript', 'Node.js'],
    status: 'Early stage',
    hue: 320,
  },
  {
    slug: 'wicc',
    title: 'WICC',
    tagline: 'Web platform',
    description:
      'A web platform in progress — a public-facing surface and an operations layer being built in parallel on one shared backend.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    status: 'In development',
    hue: 152,
  },
];
