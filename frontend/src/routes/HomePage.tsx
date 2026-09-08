import { siteMeta } from '../content/site';
import { Seo } from '../lib/seo';
import { personJsonLd } from '../lib/structured-data';
import { Hero } from '../components/sections/Hero';
import { Work } from '../components/sections/Work';
import { Services } from '../components/sections/Services';
import { Process } from '../components/sections/Process';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';

export function HomePage() {
  return (
    <>
      <Seo
        title={siteMeta.title}
        description={siteMeta.description}
        path="/"
        jsonLd={personJsonLd}
      />
      <Hero />
      <Work />
      <Services />
      <Process />
      <About />
      <Contact />
    </>
  );
}
