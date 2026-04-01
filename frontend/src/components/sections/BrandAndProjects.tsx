import { motion } from 'framer-motion';
import { ArrowRight, Code, Target, Zap, Globe, Users, Rocket } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function AboutPeter4TechSection() {
  return (
    <section id="about-brand" className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <p className="text-sm md:text-base font-semibold text-cyan-400 uppercase tracking-wider mb-3">
            About The Brand
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Peter4Tech Brand Philosophy
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Transforming ideas into innovative digital solutions with cutting-edge technology and strategic expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: Target,
              title: 'Precision-Focused',
              description: 'Every project is crafted with meticulous attention to detail and strategic alignment with your business goals',
            },
            {
              icon: Code,
              title: 'Tech-Forward',
              description: 'Leveraging the latest technologies and best practices to build scalable, maintainable solutions',
            },
            {
              icon: Users,
              title: 'Client-Centric',
              description: 'Your success is our success. We prioritize clear communication and collaborative partnerships',
            },
            {
              icon: Rocket,
              title: 'Innovation-Driven',
              description: 'Pushing boundaries and exploring new possibilities to give you competitive advantages',
            },
            {
              icon: Zap,
              title: 'Performance-Optimized',
              description: 'Lightning-fast, efficient solutions designed for peak performance and excellent user experience',
            },
            {
              icon: Globe,
              title: 'Global Ready',
              description: 'Building solutions that scale globally with security, reliability, and international standards',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group p-6 rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900/50 to-gray-800/30 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 mb-4"
                >
                  <Icon className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">{item.title}</h3>
                <p className="text-sm text-gray-300 relative z-10 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Work
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function UpcomingProjectsSection() {
  const upcomingProjects = [
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time data visualization with machine learning insights',
      status: 'Coming Q2 2026',
      technologies: ['React', 'Python', 'ML', 'D3.js'],
    },
    {
      title: 'Blockchain Enterprise Platform',
      description: 'Secure transaction system with smart contracts',
      status: 'Coming Q3 2026',
      technologies: ['Web3', 'Solidity', '.NET', 'PostgreSQL'],
    },
    {
      title: 'Mobile-First SaaS Suite',
      description: 'Cross-platform application for team collaboration',
      status: 'Coming Q4 2026',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    },
  ];

  return (
    <section id="upcoming" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <p className="text-sm md:text-base font-semibold text-purple-400 uppercase tracking-wider mb-3">
            Next Chapter
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Upcoming Projects
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Exciting initiatives in development, launching soon
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {upcomingProjects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ translateY: -8, transition: { duration: 0.3 } }}
              className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-gray-900/80 to-black/50 backdrop-blur-sm hover:border-purple-500/60 transition-all duration-300"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-xs text-purple-300 font-semibold mb-4">
                {project.status}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ProjectCatalogsSection() {
  const catalogs = [
    {
      category: 'Enterprise Solutions',
      count: 12,
      description: 'Large-scale systems for Fortune 500 companies',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      category: 'SaaS Applications',
      count: 8,
      description: 'Cloud-based software as a service platforms',
      color: 'from-purple-500 to-pink-500',
    },
    {
      category: 'Web Applications',
      count: 15,
      description: 'Modern responsive web experiences',
      color: 'from-green-500 to-emerald-500',
    },
    {
      category: 'Mobile Solutions',
      count: 6,
      description: 'iOS and Android applications',
      color: 'from-orange-500 to-red-500',
    },
    {
      category: 'DevOps & Infrastructure',
      count: 9,
      description: 'Cloud infrastructure and automation',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      category: 'AI & Machine Learning',
      count: 5,
      description: 'Intelligent systems and data analytics',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="catalogs" className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <p className="text-sm md:text-base font-semibold text-indigo-400 uppercase tracking-wider mb-3">
            Expertise Areas
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Project Catalogs
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive portfolio across multiple technology domains and industries
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {catalogs.map((catalog, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${catalog.color} shadow-xl cursor-pointer group overflow-hidden relative`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-white">{catalog.category}</h3>
                  <span className="text-2xl font-bold text-white/80">{catalog.count}</span>
                </div>
                <p className="text-sm text-white/90">{catalog.description}</p>
                <motion.div
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  className="absolute bottom-0 left-0 h-1 bg-white/50"
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
