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
    title: 'Sharp in the interface, stable in delivery.',
    copy: 'The objective is not decorative polish. It is stronger hierarchy, better contracts, and cleaner execution from UI to runtime.',
  },
  process: {
    kicker: 'How I work',
    title: 'A build path that keeps the frontend readable and the system maintainable.',
    copy: 'Clarify the brief, shape the system, then ship a cleaner interface with a runtime path that survives handoff and growth.',
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
    { value: '4 live products', label: 'Shipped & in production' },
    { value: '3+ yrs', label: 'Full-stack delivery' },
    { value: 'React · Node · .NET', label: 'Core operating lane' },
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
