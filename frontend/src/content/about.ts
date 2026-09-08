import type { AboutContent } from '../types/portfolio';

export const about: AboutContent = {
  heading: 'A product engineer who takes delivery seriously',
  paragraphs: [
    'I build software end to end — the interface someone actually uses and the backend that keeps it standing. My work sits at the point where design intent meets runtime reality, and I care about both sides equally.',
    'Most of my projects start messy: unclear scope, competing priorities, a UI that grew without a plan. I am good at turning that into a system — a clear content model, sensible API boundaries, and an interface that reads at a glance.',
    'I work with founders and product teams who want the thing shipped properly: readable, maintainable, and ready to grow after launch rather than rebuilt six months later.',
  ],
  facts: [
    { label: 'Based in', value: 'Lagos, Nigeria' },
    { label: 'Experience', value: '3+ years shipping production web & mobile' },
    { label: 'Core stack', value: 'React · TypeScript · Node.js · .NET' },
    { label: 'Focus', value: 'Product UI systems & backend delivery' },
  ],
};
