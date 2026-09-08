import { siteMeta } from '../content/site';

export const personJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Peter Ogba',
  jobTitle: 'Full-Stack Engineer',
  url: siteMeta.url,
  address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
  sameAs: [
    'https://github.com/peterchims',
    'https://www.linkedin.com/in/peter-ogba-970a0615b/',
  ],
};
