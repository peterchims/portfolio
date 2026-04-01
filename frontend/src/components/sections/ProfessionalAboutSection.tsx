import { motion } from 'framer-motion';
import { CheckCircle2, Lightbulb, Users, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Lightbulb,
    title: 'Strategic Innovation',
    description: 'Transform your ideas into market-leading solutions',
  },
  {
    icon: Zap,
    title: 'Rapid Development',
    description: 'Fast turnaround without compromising on quality',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: '24/7 support and continuous optimization',
  },
  {
    icon: CheckCircle2,
    title: 'Quality Assured',
    description: 'Enterprise-grade testing and best practices',
  },
];

export function ProfessionalAboutSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-sm md:text-base font-semibold text-cyan-400 uppercase tracking-widest mb-4">
              About Your Developer
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Expert Solutions for Modern Challenges
            </h2>

            <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
              With 8+ years of professional experience in full-stack development, I deliver
              comprehensive solutions that drive business growth. Specialized in building
              scalable applications that perform.
            </p>

            <p className="text-base text-gray-400 mb-8">
              From concept to deployment, I ensure every project meets the highest standards
              of quality, security, and performance. Your success is my priority.
            </p>

            {/* Highlight Cards */}
            <div className="space-y-4">
              {highlights.map((highlight, idx) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{highlight.title}</h3>
                      <p className="text-sm text-gray-400">{highlight.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* Decorative Card */}
            <div className="relative">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl" />

              {/* Main Card */}
              <div className="relative p-8 rounded-3xl border border-gray-700 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur">
                {/* Tech Stack Showcase */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">
                      Frontend Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">
                      Backend Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['.NET', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis'].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">
                      Tools & Platforms
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Docker', 'AWS', 'Azure', 'Git', 'CI/CD'].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Accent */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    <span className="text-cyan-400 font-semibold">Ready to build?</span> Let's
                    create something amazing together.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
