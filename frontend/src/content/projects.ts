import type { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    slug: 'wisdom-church-hq',
    title: 'Wisdom Church HQ',
    year: '2025',
    category: 'Full-stack platform',
    summary:
      'A public church presence and a secure operations portal for the team running it — two surfaces, one backend.',
    role: 'Full-stack engineer — public site, admin portal, API, auth',
    highlights: [
      'Public site: watch live, plan a visit, give, and browse ministries and events',
      'Admin portal (admin.wisdomchurchhq.org): people, forms, events, campaigns and approvals',
      'Role-based access, auditable approvals, and a shared data model across both surfaces',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
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
        'A single typed data model shared by both surfaces, with Redis in front of the read-heavy public pages.',
      ],
      outcome:
        'The church has a credible public presence and one operational command centre. Staff work from shared, auditable records instead of a spreadsheet each.',
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
        caption: 'admin.wisdomchurchhq.org: people, events, forms and campaigns in one place.',
      },
    ],
  },
  {
    slug: 'claudygod-platform',
    title: 'ClaudyGod Platform',
    year: '2024 – 2025',
    category: 'Full-stack platform',
    summary:
      'A ministry media platform across three surfaces — a public web experience, a mobile app, and an admin studio that drives both.',
    role: 'Full-stack engineer — web, React Native app, admin studio, API, realtime',
    highlights: [
      'Public web (claudygod.org): music, media and events in a clean content system',
      'Mobile app (mobileapp.claudygod.org): worship, videos and live sessions, app-first',
      'Ministry Studio (mobileadmin.claudygod.org): publishing, audience analytics, live control, RBAC',
    ],
    stack: ['React', 'React Native', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://claudygod.org/#/',
    codeUrl: 'https://github.com/peterchims/claudygod',
    featured: false,
    image: '/images/claudygod-admin.jpg',
    hue: 268,
    caseStudy: {
      problem:
        'The ministry needed to reach its audience wherever they were — browser, phone, live stream — but every channel was managed separately and content drifted out of sync between them.',
      approach:
        'I built one backend and content model, then three surfaces on top: a discovery-first public site, an app-first mobile experience, and a Ministry Studio where staff publish once and it lands everywhere, with realtime updates keeping releases and live sessions current.',
      decisions: [
        'A single content model shared by web, app and studio so nothing has to be entered twice.',
        'Socket.io for release, message and live-session updates so every surface feels live.',
        'Role-based access and audience analytics in the studio, with mobile-app configuration handled from the same place.',
      ],
      outcome:
        'One publish reaches web, app and live. The team runs the whole platform — music, videos, live sessions, monetisation — from a single secure workspace.',
    },
    figures: [
      {
        src: '/images/claudygod-app.jpg',
        alt: 'ClaudyGod mobile app',
        caption: 'The mobile app — worship, videos and live sessions, app-first.',
      },
      {
        src: '/images/claudygod-ministries.jpg',
        alt: 'ClaudyGod public web',
        caption: 'The public web experience — discovery-first, one card system.',
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
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'Redux', 'Node.js'],
    liveUrl: 'https://cashra.app/',
    codeUrl: null,
    featured: false,
    image: '/images/cashra.jpg',
    hue: 152,
    caseStudy: {
      problem:
        'Personal finance tools tend to overwhelm. People open them to answer one question — "can I spend this?" — and get a wall of charts instead.',
      approach:
        'I structured the product around three recurring jobs: connect and record activity quickly, see the position at a glance, and review a month without hunting. An AI layer sits on top to summarise what the numbers mean.',
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
