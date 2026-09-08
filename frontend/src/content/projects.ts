import type { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    slug: 'cashra-finance-manager',
    title: 'Cashra Finance Manager',
    year: '2025',
    category: 'Finance product',
    summary:
      'A finance manager focused on simple tracking, budget visibility, and decision-friendly reporting instead of feature clutter.',
    role: 'Full-stack engineer — product architecture, UI system, API integration',
    highlights: [
      'Reduced noise in budgeting and reporting flows',
      'Organised key actions around recurring money tasks',
      'Kept the UI focused on visibility rather than dashboard decoration',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'React Router', 'Redux'],
    liveUrl: null,
    codeUrl: null,
    featured: true,
    caseStudy: {
      problem:
        'Personal finance tools tend to overwhelm. Users open them to answer one question — "can I spend this?" — and get a wall of charts instead.',
      approach:
        'I structured the product around three recurring jobs: record income and expenses quickly, see the budget position at a glance, and review a month without hunting. Everything else moved a level deeper.',
      decisions: [
        'A single primary action per screen so the interface never competes with the decision.',
        'React Query for server state to keep the UI honest about loading and staleness.',
        'A typed category and budget model so reporting stayed consistent as features grew.',
      ],
      outcome:
        'Budgeting and reporting flows carry far less visual weight, and the core "what can I spend" answer is reachable in one view.',
    },
  },
  {
    slug: 'claudygod-music-ministries',
    title: 'ClaudyGod Music & Ministries',
    year: '2024',
    category: 'Media platform',
    summary:
      'A ministry and music experience combining streaming, event visibility, and audience engagement in a cleaner content system.',
    role: 'Frontend engineer — content architecture, UI, responsive delivery',
    highlights: [
      'Improved the browsing path for music, media, and updates',
      'Balanced ministry communication with media-platform structure',
      'Kept the experience accessible across desktop and mobile',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://claudygod.org/#/',
    codeUrl: 'https://github.com/peterchims/claudygod',
    featured: true,
    caseStudy: {
      problem:
        'The site had to serve two audiences at once — people looking for music and media, and people looking for ministry information — without either getting buried.',
      approach:
        'I separated the content model into discovery-first surfaces (music, media, releases) and communication surfaces (updates, events), then gave each a consistent layout language.',
      decisions: [
        'A shared card and section system so new content types slot in without redesign.',
        'Mobile-first layouts, since most of the audience arrives on a phone.',
        'Predictable navigation depth so nothing important sits more than two taps away.',
      ],
      outcome:
        'Content discovery got noticeably calmer, and the platform can absorb new media without the layout drifting.',
    },
  },
  {
    slug: 'claudygod-music-app',
    title: 'ClaudyGod Music App',
    year: '2025',
    category: 'Mobile product',
    summary:
      'A mobile listening experience for music, messages, playlists, and release discovery with an app-first delivery path.',
    role: 'Mobile engineer — React Native app, realtime layer, API',
    highlights: [
      'Carried the platform into a dedicated mobile product lane',
      'Focused the experience on listening, playlists, and continuity',
      'Shaped the interface for smaller screens without losing clarity',
    ],
    stack: ['React Native', 'TypeScript', 'MongoDB', 'Socket.io'],
    liveUrl: null,
    codeUrl: null,
    featured: false,
    caseStudy: {
      problem:
        'The web platform worked, but the core audience wanted to listen the way they use every other music app — on their phone, in the background, across sessions.',
      approach:
        'I built a React Native app centred on the listening loop: browse, queue, play, resume. Realtime updates kept new releases and messages current without a manual refresh.',
      decisions: [
        'A minimal player surface that stays out of the way during playback.',
        'Socket.io for release and message updates so the catalogue feels live.',
        'A MongoDB content model shared in shape with the web platform to avoid divergence.',
      ],
      outcome:
        'The platform now has a focused mobile lane built around retention rather than a shrunken copy of the website.',
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
