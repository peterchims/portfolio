import type { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    slug: 'wisdom-church-hq',
    title: 'Wisdom Church HQ',
    year: '2025',
    category: 'Full-stack platform',
    summary:
      'A public church presence and a secure operations portal for the team running it — one system, two surfaces.',
    role: 'Full-stack engineer — public site, operations portal, API, auth',
    highlights: [
      'Public site: watch live, plan a visit, give, and browse ministries and events',
      'Admin portal: people, forms, events, campaigns and approvals in one command centre',
      'Role-based access, auditable approvals, and a shared data model across both surfaces',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
    liveUrl: 'https://wisdomchurchhq.org/',
    codeUrl: null,
    featured: true,
    image: '/images/wisdomchurch-admin.jpg',
    hue: 42,
    caseStudy: {
      problem:
        'The church had no real digital front door and ran its operations — new members, volunteers, events, follow-up — across disconnected spreadsheets and chat threads. Nothing was auditable and nothing was shared.',
      approach:
        'I built two surfaces on one backend: a public site focused on the three things visitors actually do (watch, plan a visit, give), and a secure operations portal where staff manage people, forms, events and campaigns against the same records.',
      decisions: [
        'Role-based access so volunteers, pastors and admins each see exactly their slice.',
        'Every approval is logged — membership, giving changes, campaign sends — so governance is real, not implied.',
        'A single typed data model shared by both surfaces, so the public site and the portal never drift apart.',
      ],
      outcome:
        'The church now has a credible public presence and a single operational command centre. Staff work from shared, auditable records instead of a spreadsheet each.',
    },
    figures: [
      {
        src: '/images/wisdomchurch.jpg',
        alt: 'The Wisdom Church public site',
        caption: 'The public site — built around watch, plan a visit, and give.',
      },
      {
        src: null,
        alt: 'Operations portal — people & approvals',
        caption: 'The operations portal: people, events, forms and campaigns in one place.',
      },
    ],
  },
  {
    slug: 'cashra-finance-manager',
    title: 'Cashra',
    year: '2025',
    category: 'AI finance product',
    summary:
      'An AI-assisted personal finance manager — connected accounts, budgets, goals, and analysis that answers "can I spend this?" without a wall of charts.',
    role: 'Full-stack engineer — product architecture, UI system, API integration',
    highlights: [
      'Connected-account balances, spending, budgets, goals, bills and debts in one view',
      'An AI analysis layer that turns raw activity into plain-language insight',
      'Kept the interface focused on visibility rather than dashboard decoration',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'React Router', 'Redux'],
    liveUrl: 'https://cashra.app/',
    codeUrl: null,
    featured: false,
    image: '/images/cashra.jpg',
    hue: 152,
    caseStudy: {
      problem:
        'Personal finance tools tend to overwhelm. People open them to answer one question — "can I spend this?" — and get a wall of charts instead.',
      approach:
        'I structured the product around three recurring jobs: record and connect activity quickly, see the position at a glance, and review a month without hunting. An AI layer sits on top to summarise what the numbers mean.',
      decisions: [
        'A single primary action per screen so the interface never competes with the decision.',
        'React Query for server state to keep the UI honest about loading and staleness.',
        'A typed category and budget model so reporting — and the AI analysis — stayed consistent as features grew.',
      ],
      outcome:
        'Budgeting and reporting carry far less visual weight, and the core "what can I spend" answer — plus an AI read on it — is reachable in one view. Live at cashra.app.',
    },
    figures: [
      {
        src: null,
        alt: 'Cashra budget overview',
        caption: 'Budget overview — one primary action, the spend position up top.',
      },
      {
        src: null,
        alt: 'Cashra AI analysis',
        caption: 'The AI analysis panel — plain-language insight from connected activity.',
      },
    ],
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
    featured: false,
    image: '/images/claudygod-ministries.jpg',
    hue: 276,
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
    figures: [
      {
        src: null,
        alt: 'ClaudyGod music catalogue',
        caption: 'The music surface — discovery-first, one consistent card system.',
      },
      {
        src: null,
        alt: 'ClaudyGod ministry page',
        caption: 'Ministry communication kept distinct from the media-platform layout.',
      },
    ],
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
    image: null,
    hue: 224,
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
    figures: [
      {
        src: null,
        alt: 'ClaudyGod app now playing screen',
        caption: 'Now playing — a minimal player that stays out of the way.',
      },
    ],
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
