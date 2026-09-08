import type { Profile } from '../types/portfolio';

export const profile: Profile = {
  name: 'Peter Ogba',
  role: 'Full-Stack Engineer',
  headline: 'Product interfaces that read clearly, backend systems that hold up.',
  summary:
    'Lagos-based engineer shipping React, TypeScript, and Node.js products for teams that want sharp user experience and disciplined delivery in the same lane.',
  location: 'Lagos, Nigeria',
  email: 'peter4tech@gmail.com',
  phone: '+234 808 639 2101',
  availability: 'Open to freelance builds, contract delivery, and product teams that care about quality.',
  resumeUrl: '/peter-ogba-resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/peterchims', handle: '@peterchims' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/peter-ogba-970a0615b/',
      handle: 'Peter Ogba',
    },
    { label: 'Email', href: 'mailto:peter4tech@gmail.com', handle: 'peter4tech@gmail.com' },
  ],
};
