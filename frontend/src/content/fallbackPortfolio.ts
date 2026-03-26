import type { PortfolioContent } from '../types/portfolio';

export const fallbackPortfolio: PortfolioContent = {
  profile: {
    name: 'Peter Ogba',
    role: 'Full-Stack Engineer',
    headline:
      'I build product interfaces that feel sharp and backend systems that stay stable under pressure.',
    summary:
      'Lagos-based engineer shipping React, TypeScript, Node.js, and delivery workflows for product teams that need both visual polish and operational discipline.',
    location: 'Lagos, Nigeria',
    email: 'peter4tech@gmail.com',
    phone: '+234 808 639 2101',
    availability: 'Open to freelance builds, contract delivery, and strong product teams.',
    resumeUrl: '/peter-ogba-resume.pdf',
  },
  heroMetrics: [
    {
      value: '3+ yrs',
      label: 'Production delivery',
      detail: 'Shipping modern web and mobile-facing products.',
    },
    {
      value: '50+',
      label: 'Project cycles',
      detail: 'Across launches, refactors, experiments, and client work.',
    },
    {
      value: 'React + Node',
      label: 'Core operating lane',
      detail: 'Frontend precision paired with backend ownership.',
    },
  ],
  socialLinks: [
    {
      label: 'GitHub',
      href: 'https://github.com/peterchims',
      handle: '@peterchims',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/peter-ogba-970a0615b/',
      handle: 'Peter Ogba',
    },
    {
      label: 'Email',
      href: 'mailto:peter4tech@gmail.com',
      handle: 'peter4tech@gmail.com',
    },
  ],
  servicePillars: [
    {
      title: 'Frontend Systems',
      description:
        'Responsive interfaces with stronger hierarchy, cleaner state flow, and product-focused interaction design.',
      bullets: [
        'Design systems and reusable UI foundations',
        'React and TypeScript architecture',
        'Mobile-first execution with performance discipline',
      ],
    },
    {
      title: 'Backend Delivery',
      description:
        'APIs, validation, runtime safeguards, and operational paths that turn a portfolio into an actual application.',
      bullets: [
        'REST endpoints and contract shaping',
        'Validation, persistence, and request tracing',
        'Deployment-ready Node server workflows',
      ],
    },
    {
      title: 'Launch Discipline',
      description:
        'I do not stop at UI polish. I wire the content, deployment path, and run-time behavior needed to ship cleanly.',
      bullets: [
        'Production build flow and environment handling',
        'Content modeling for maintainable updates',
        'Clear handoff documentation and cleanup',
      ],
    },
  ],
  featuredProjects: [
    {
      title: 'Cashra Finance Manager',
      year: '2025',
      category: 'Finance Product',
      summary:
        'A finance manager focused on simple tracking, budget visibility, and decision-friendly reporting.',
      impact:
        'Structured the product around clearer flows for income, expenses, and reporting instead of feature clutter.',
      stack: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'React Query',
        'React Router',
        'Redux',
      ],
      liveUrl: null,
      codeUrl: null,
    },
    {
      title: 'ClaudyGod Music & Ministries',
      year: '2024',
      category: 'Media Platform',
      summary:
        'A ministry and music experience combining streaming, event visibility, and audience engagement.',
      impact:
        'Built a cleaner presentation layer for content discovery while keeping the platform accessible to a broad audience.',
      stack: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Responsive Design',
        'Node.js',
      ],
      liveUrl: 'https://claudygod.org/#/',
      codeUrl: 'https://github.com/peterchims/claudygod',
    },
    {
      title: 'ClaudyGod Music App',
      year: '2025',
      category: 'Mobile Product',
      summary:
        'A mobile listening experience for music, messages, playlists, and release discovery.',
      impact:
        'Extended the platform into mobile-first delivery so audiences could stay connected beyond the browser.',
      stack: ['React Native', 'TypeScript', 'MongoDB', 'Socket.io'],
      liveUrl: null,
      codeUrl: null,
    },
  ],
  stackGroups: [
    {
      title: 'Interface',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive UI'],
    },
    {
      title: 'Backend',
      items: ['Node.js', 'REST APIs', 'Validation', 'Request tracing', 'File-backed persistence'],
    },
    {
      title: 'Data & Ops',
      items: ['MongoDB', 'PostgreSQL', 'Docker', 'Health checks', 'Runtime env control'],
    },
    {
      title: 'Delivery',
      items: ['Git workflows', 'Refactors', 'Documentation', 'Production cleanup', 'Launch support'],
    },
  ],
  processSteps: [
    {
      title: 'Clarify the brief',
      description:
        'Translate vague requirements into concrete screens, contracts, and deliverables before writing implementation code.',
    },
    {
      title: 'Shape the system',
      description:
        'Define the content model, API boundaries, runtime safeguards, and component structure early.',
    },
    {
      title: 'Ship with intent',
      description:
        'Build the interface, wire the backend, and remove dead weight so the result is coherent instead of patched together.',
    },
    {
      title: 'Prepare for production',
      description:
        'Verify build paths, storage behavior, rate limits, and deployment instructions so the work can actually run.',
    },
  ],
  systemSignals: [
    {
      label: 'api mode',
      value: 'content-driven',
      detail: 'Frontend content is served from a Node endpoint rather than hard-coded into the UI.',
      tone: 'support',
    },
    {
      label: 'contact flow',
      value: 'validated + persisted',
      detail: 'Submissions are sanitized, rate-limited, and written to local storage with a reference id.',
      tone: 'accent',
    },
    {
      label: 'ops posture',
      value: 'production-aware',
      detail: 'Health checks, request ids, and Docker support are included in the delivery path.',
      tone: 'accent',
    },
  ],
};
