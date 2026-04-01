import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Peter4TechLogoV2 } from './components/Peter4TechLogoV2';
import { UpcomingProjectsSection, ProjectCatalogsSection } from './components/sections/BrandAndProjects';
import { ChatWidget } from './components/common/ChatWidget';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PreloadPage } from './components/PreloadPage';
import { startChatConversation, sendChatMessage } from './lib/api';
import { getFeaturedProjects } from './services/portfolioService';
import { ParallaxBackground } from './hooks/useParallax';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProfessionalAboutSection } from './components/sections/ProfessionalAboutSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { MetricsSection } from './components/sections/MetricsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { CTASection } from './components/sections/CTASection';
import type { Project } from './services/portfolioService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AppModern() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);

  // Load portfolio data from API
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setIsLoading(true);
        const projectsData = await getFeaturedProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to load portfolio data:', error);
      } finally {
        setIsLoading(false);
        // Simulate preload animation delay
        setTimeout(() => {
          setIsPageReady(true);
        }, 2000);
      }
    };

    loadPortfolioData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Parallax effects are handled in ParallaxBackground component
      return;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartChat = async (name: string, email: string, message: string) => {
    try {
      await startChatConversation({
        visitorName: name,
        visitorEmail: email,
        initialMessage: message,
      });
      setIsChatOpen(true);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const handleSendMessage = async (conversationId: string, message: string) => {
    try {
      await sendChatMessage(conversationId, message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const navItems = [
    { id: 'about-brand', label: 'About' },
    { id: 'projects', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {!isPageReady && <PreloadPage />}
      <div className="bg-black text-white min-h-screen">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Peter4TechLogoV2 />
            <div className="hidden md:block">
              <p className="text-sm font-bold">Peter4Tech</p>
              <p className="text-xs text-cyan-400">Solutions</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              Get In Touch
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gradient-to-b from-cyan-500/10 via-purple-500/10 to-black border-t border-cyan-500/30"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm font-medium text-gray-300 hover:text-cyan-400 py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="block px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-sm font-semibold text-center"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 relative overflow-hidden">
        <ParallaxBackground speed={0.3} className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-indigo-500/10 to-slate-900/20 pointer-events-none">
          <div className="w-full h-full" />
        </ParallaxBackground>
        <div className="absolute top-40 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-teal-400 text-sm md:text-base font-semibold uppercase tracking-widest mb-6"
            >
              Professional Developer
            </motion.p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Building Digital
              </span>
              <br />
              <span className="text-white">Excellence</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Full-stack solutions that transform ideas into scalable, production-ready applications
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(20, 184, 166, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-white shadow-lg"
              >
                View My Work
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-10 py-4 border-2 border-teal-500 text-teal-400 hover:text-teal-300 rounded-xl font-semibold transition-all duration-300"
              >
                Start a Project
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-6 mt-16"
          >
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:contact@peter4tech.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-gray-700 hover:border-cyan-500 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Brand Section */}
      <ProfessionalAboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Metrics Section */}
      <MetricsSection />

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12"
          >
            <p className="text-sm md:text-base font-semibold text-purple-400 uppercase tracking-wider mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Featured Work
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No featured projects yet</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 bg-gray-900/50 backdrop-blur"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 text-xs text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 text-xs text-gray-300">
                            +{project.technologies.length - 3}more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={16} /> Live
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-gray-700/50 border border-gray-600 hover:border-gray-500 text-gray-300 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Github size={16} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Upcoming Projects Section */}
      <UpcomingProjectsSection />

      {/* Project Catalogs Section */}
      <ProjectCatalogsSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-black via-purple-900/20 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12"
          >
            <p className="text-sm md:text-base font-semibold text-pink-400 uppercase tracking-wider mb-3">
              Let's Connect
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Start Your Project
            </h2>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-2xl border border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
              />
            </div>

            <input
              type="text"
              placeholder="Project Title"
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
            />

            <textarea
              placeholder="Project details..."
              rows={5}
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300 resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold rounded-lg transition-all duration-300 font-semibold"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Peter4TechLogoV2 />
              <p className="text-sm text-gray-400">© 2026 Peter4Tech</p>
            </div>

            <div className="flex gap-6">
              {[
                { icon: Github, href: 'https://github.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Mail, href: 'mailto:contact@peter4tech.com' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget
        onStartChat={handleStartChat}
        onSendMessage={handleSendMessage}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
