import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Peter4TechLogo } from './components/layout/Logo';
import { AboutPeter4TechSection, UpcomingProjectsSection, ProjectCatalogsSection } from './components/sections/BrandAndProjects';
import { ChatWidget } from './components/common/ChatWidget';
import { startChatConversation, sendChatMessage } from './lib/api';

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
  const [scrollY, setScrollY] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartChat = async (name: string, email: string, message: string) => {
    try {
      const response = await startChatConversation({
        visitorName: name,
        visitorEmail: email,
        initialMessage: message,
      });
      setCurrentConversationId(response.id);
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
    { id: 'about-brand', label: 'Brand' },
    { id: 'projects', label: 'Featured Projects' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'catalogs', label: 'Catalogs' },
    { id: 'contact', label: 'Contact' },
  ];

  const featuredProjects = [
    {
      title: 'Enterprise SaaS Platform',
      description: 'Full-stack cloud application for team collaboration',
      image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db6d?w=600&h=400&fit=crop',
      tech: ['React', '.NET', 'PostgreSQL', 'Docker'],
      liveUrl: '#',
      sourceUrl: '#',
    },
    {
      title: 'Real-time Analytics Dashboard',
      description: 'Advanced data visualization with WebSocket integration',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tech: ['Next.js', 'Node.js', 'Python', 'D3.js'],
      liveUrl: '#',
      sourceUrl: '#',
    },
    {
      title: 'Mobile-First E-Commerce',
      description: 'Responsive shopping platform with real-time inventory',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      tech: ['React Native', 'Firebase', 'Stripe'],
      liveUrl: '#',
      sourceUrl: '#',
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Peter4TechLogo />
            <div className="hidden md:block">
              <p className="text-sm font-bold">Peter4Tech</p>
              <p className="text-xs text-cyan-400">Digital Solutions</p>
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
              className="md:hidden bg-black/90 border-t border-gray-800"
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
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-pink-500/20 pointer-events-none" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl pointer-events-none" />

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
              className="text-cyan-400 text-sm md:text-base font-semibold uppercase tracking-widest mb-4"
            >
              Welcome to Peter4Tech
            </motion.p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Building Tomorrow's</span>
              <br />
              <span>Digital Solutions</span>
            </h1>

            <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Crafting innovative, scalable, and beautiful digital experiences with cutting-edge technology and strategic expertise.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-semibold transition-all duration-300"
              >
                Start a Project
              </a>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-6 mt-12"
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
      <AboutPeter4TechSection />

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
              Showcase
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              A selection of recent projects that showcase our expertise
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 bg-gray-900/50 backdrop-blur"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
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
                  <p className="text-sm text-gray-300 mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="flex-1 py-2 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} /> Live
                    </a>
                    <a
                      href={project.sourceUrl}
                      className="flex-1 py-2 bg-gray-700/50 border border-gray-600 hover:border-gray-500 text-gray-300 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Github size={16} /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Projects Section */}
      <UpcomingProjectsSection />

      {/* Project Catalogs Section */}
      <ProjectCatalogsSection />

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
              Get In Touch
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Have a project in mind? I'd love to hear about it and explore how we can work together.
            </p>
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
              placeholder="Tell me about your project..."
              rows={6}
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
              <Peter4TechLogo />
              <p className="text-sm text-gray-400">© 2026 Peter4Tech. All rights reserved.</p>
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
    </div>
  );
}
