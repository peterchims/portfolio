import type { AboutContent } from '../types/portfolio';

export const about: AboutContent = {
  heading: 'A full-stack engineer who scopes from the problem, not the stack',
  paragraphs: [
    'I design and ship complete systems end to end — typed frontends, resilient APIs, and the infrastructure that keeps them fast and reliable under real load. On the frontend that means TypeScript with Next.js and Angular; on the backend, Go and Node.js/Express, backed by Redis and worker-based job processing for anything that should not block a request.',
    'I care about the parts most people skip — data flow, failure modes, and performance under real conditions — because that is usually where "it works on my machine" turns into a production incident. Clear service boundaries, a sync path that stays fast, and async work that fails gracefully.',
    'Off the keyboard I am usually reading about distributed systems, contributing to open source, or playing bass guitar.',
  ],
  facts: [
    { label: 'Based in', value: 'Lagos, Nigeria' },
    { label: 'Frontend', value: 'TypeScript · Next.js · React · Angular · Tailwind' },
    { label: 'Backend', value: 'Go · Node.js / Express · Redis · Job queues' },
    { label: 'Data & infra', value: 'PostgreSQL · MongoDB · Docker · Background workers' },
  ],
};
