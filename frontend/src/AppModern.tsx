import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeaderModern from './components/layout/HeaderModern';
import FooterModern from './components/layout/FooterModern';
import HeroModern from './components/sections/HeroModern';
import ProjectsModern from './components/sections/ProjectsModern';
import SkillsModern from './components/sections/SkillsModern';
import TestimonialsModern from './components/sections/TestimonialsModern';
import BlogModern from './components/sections/BlogModern';
import ContactModern from './components/sections/ContactModern';
import './styles/glass.css';
import './index.css';

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isMounted && (
        <>
          {/* Animated Background */}
          <div className="animated-bg" />

          {/* Header */}
          <HeaderModern />

          {/* Main Content */}
          <main className="pt-20">
            {/* Hero Section */}
            <HeroModern />

            {/* Projects Section */}
            <ProjectsModern />

            {/* Skills Section */}
            <SkillsModern />

            {/* Testimonials Section */}
            <TestimonialsModern />

            {/* Blog Section */}
            <BlogModern />

            {/* Contact Section */}
            <ContactModern />
          </main>

          {/* Footer */}
          <FooterModern />
        </>
      )}
    </AnimatePresence>
  );
}

export default App;
