export const siteMeta = {
  url: 'https://peterogba.dev',
  title: 'Peter Ogba — Full-Stack Engineer',
  description:
    'Peter Ogba is a Lagos-based full-stack engineer building clear product interfaces and dependable backend systems.',
};

export const sectionIntros = {
  work: {
    kicker: 'Selected work',
    title: 'Projects shaped around practical product outcomes.',
    copy: 'Each case study shows what the product is, where the leverage was, and which technical choices mattered.',
  },
  services: {
    kicker: 'Capabilities',
    title: 'The whole stack — and the parts most people skip.',
    copy: 'Frontend, API, and the infrastructure underneath. Where the sync path stays fast and async work fails gracefully.',
  },
  process: {
    kicker: 'How I work',
    title: 'Scope from the problem. Then choose the stack that fits.',
    copy: 'Clarify the outcome, draw the service boundaries, and ship a runtime path that survives handoff and real load.',
  },
  about: {
    kicker: 'About',
    title: 'The person behind the work.',
    copy: '',
  },
  contact: {
    kicker: 'Contact',
    title: 'Need a cleaner frontend, a steadier backend, or both?',
    copy: 'Use the form for serious product work, redesigns, implementation support, or delivery cleanup.',
  },
};

export const hero = {
  eyebrow: 'Full-stack engineer · Lagos, Nigeria',
  primaryCta: { label: 'View work', href: '#work' },
  secondaryCta: { label: 'Download résumé', href: '/peter-ogba-resume.pdf' },
  headerCta: { label: 'Start a project', href: '#contact' },
  proofPoints: [
    { value: '3 platforms', label: 'Web · mobile · admin, end to end' },
    { value: '3+ yrs', label: 'Full-stack delivery' },
    { value: 'TS · Go · Node', label: 'Core operating lane' },
  ],
};

export const footer = {
  tagline:
    'Readable interfaces, stable delivery, and product systems that keep working after launch.',
};

export const contactForm = {
  helperText:
    'Serious briefs only. Requests are stored and acknowledged with a reference id.',
  submitLabel: 'Send project brief',
  submittingLabel: 'Sending…',
  fields: {
    projectType: {
      label: 'Project type',
      options: [
        { value: 'frontend-redesign', label: 'Frontend redesign' },
        { value: 'design-system', label: 'Design system & UI cleanup' },
        { value: 'backend-integration', label: 'Backend integration' },
        { value: 'full-stack-delivery', label: 'Full-stack delivery' },
      ],
    },
    budget: {
      label: 'Budget',
      options: [
        { value: 'under-2k', label: 'Under $2k' },
        { value: '2k-5k', label: '$2k – $5k' },
        { value: '5k-10k', label: '$5k – $10k' },
        { value: '10k-plus', label: '$10k+' },
      ],
    },
    timeline: {
      label: 'Timeline',
      options: [
        { value: 'asap', label: 'As soon as possible' },
        { value: '2-4-weeks', label: '2 – 4 weeks' },
        { value: '1-2-months', label: '1 – 2 months' },
        { value: 'flexible', label: 'Flexible' },
      ],
    },
  },
};
