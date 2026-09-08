import type { Service } from '../types/portfolio';

export const services: Service[] = [
  {
    title: 'Product frontends',
    description:
      'Typed, component-driven UIs in Next.js and Angular that stay maintainable as they scale — with performance and accessibility treated as a baseline, not an afterthought.',
    tags: [
      'Next.js · React · Angular',
      'Design systems',
      'Code-splitting & lazy loading',
      'Core Web Vitals',
      'WCAG / a11y',
    ],
  },
  {
    title: 'Resilient APIs & services',
    description:
      'Services that communicate cleanly, with clear boundaries between the synchronous request path and the async work behind it. Go and Node.js, REST, GraphQL and WebSockets.',
    tags: [
      'Go · Node.js / Express',
      'REST · GraphQL · WebSockets',
      'Validation & request tracing',
      'Clear service boundaries',
    ],
  },
  {
    title: 'Infrastructure that holds up',
    description:
      'The parts most people skip: caching, rate limiting, and background workers so nothing that should not block a response ever does — and the system degrades gracefully when something fails.',
    tags: [
      'Redis — caching & rate limiting',
      'Background workers / job queues',
      'PostgreSQL · MongoDB',
      'Docker',
      'Graceful degradation',
    ],
  },
  {
    title: 'Launch & reliability',
    description:
      'Solution-first delivery: scope from the user outcome, wire the build and deployment path, and leave behind documentation instead of tribal knowledge.',
    tags: [
      'CI/CD & production build flow',
      'Observability of failure modes',
      'Testing — Jest · Cypress',
      'Handoff documentation',
    ],
  },
];
