import type { Profile } from '../types/portfolio';

export const profile: Profile = {
  name: 'Peter Ogba',
  role: 'Full-Stack Engineer',
  headline: 'I start from the problem, then ship the whole system — frontend, API, and the infrastructure under it.',
  summary:
    'Lagos-based full-stack engineer. Typed frontends in Next.js and Angular, resilient APIs in Go and Node.js, and the caching, queues and workers that keep them fast under real load.',
  location: 'Lagos, Nigeria',
  email: 'peter4tech@gmail.com',
  phone: '+234 808 639 2101',
  availability: 'Open to full-stack contracts, product teams, and builds that need someone across the whole stack.',
  resumeUrl: '/peter-ogba-resume.pdf',
  // Add a portrait at frontend/public/images/peter-ogba.jpg and set this to
  // '/images/peter-ogba.jpg'. Until then the About section renders a monogram.
  photoUrl: null,
  githubUser: 'peterchims',
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
