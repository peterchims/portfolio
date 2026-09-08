import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  Code2,
  GitBranch,
  Layers,
  ListTree,
  Plug,
  Server,
  Webhook,
} from 'lucide-react';
import type { TechSlug } from '../components/ui/TechIcon';

export interface StackTool {
  name: string;
  /** Brand mark from TechIcon; omit to fall back to `Icon` or the group icon. */
  brand?: TechSlug;
  /** Lucide fallback when there is no brand mark. */
  Icon?: LucideIcon;
}

export interface StackGroup {
  label: string;
  Icon: LucideIcon;
  tools: StackTool[];
}

/** The kit I actually reach for — grouped by where it sits in the stack. */
export const stackGroups: StackGroup[] = [
  {
    label: 'Languages',
    Icon: Code2,
    tools: [
      { name: 'TypeScript', brand: 'typescript' },
      { name: 'JavaScript (ES6+)', brand: 'javascript' },
      { name: 'Go', brand: 'go' },
    ],
  },
  {
    label: 'Frameworks & UI',
    Icon: Layers,
    tools: [
      { name: 'Next.js', brand: 'nextjs' },
      { name: 'React', brand: 'react' },
      { name: 'Angular', brand: 'angular' },
      { name: 'Tailwind CSS', brand: 'tailwind' },
      { name: 'Sass', brand: 'sass' },
    ],
  },
  {
    label: 'APIs & services',
    Icon: Server,
    tools: [
      { name: 'Node.js', brand: 'node' },
      { name: 'Express', brand: 'express' },
      { name: 'Go services', brand: 'go' },
      { name: 'REST', Icon: Webhook },
      { name: 'GraphQL', brand: 'graphql' },
      { name: 'WebSockets', Icon: Plug },
    ],
  },
  {
    label: 'Data & infra',
    Icon: Boxes,
    tools: [
      { name: 'PostgreSQL', brand: 'postgres' },
      { name: 'MongoDB', brand: 'mongodb' },
      { name: 'Redis', brand: 'redis' },
      { name: 'Docker', brand: 'docker' },
      { name: 'Job queues / workers', Icon: ListTree },
    ],
  },
  {
    label: 'Build & tooling',
    Icon: GitBranch,
    tools: [
      { name: 'Vite', brand: 'vite' },
      { name: 'Webpack', brand: 'webpack' },
      { name: 'Jest', brand: 'jest' },
      { name: 'Cypress', brand: 'cypress' },
      { name: 'Git', brand: 'git' },
    ],
  },
];
