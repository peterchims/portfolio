import { motion } from 'framer-motion';
import { Code2, Zap, Smartphone, Shield, Cloud, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Custom web applications built with modern technologies',
    details: ['React & Next.js', 'Node.js & .NET', 'RESTful APIs', 'Real-time Systems'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications',
    details: ['React Native', 'iOS & Android', 'Progressive Web Apps', 'Responsive Design'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Scalable infrastructure and deployment solutions',
    details: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Database Optimization'],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Fast, efficient applications that convert',
    details: ['Load Time Optimization', 'Database Tuning', 'Caching Strategies', 'SEO Optimization'],
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security implementations',
    details: ['OAuth & JWT', 'Data Encryption', 'Compliance Standards', 'Penetration Testing'],
  },
  {
    icon: Code2,
    title: 'AI Integration',
    description: 'Machine learning and AI-powered features',
    details: ['LLM Integration', 'Automation', 'Data Analytics', 'Predictive Models'],
  },
];

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

export function ServicesSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm md:text-base font-semibold text-cyan-400 uppercase tracking-widest mb-4">
            Expertise
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Services & Capabilities
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            End-to-end development solutions tailored to your business goals
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/20 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur"
              >
                {/* Icon */}
                <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{service.description}</p>

                {/* Details */}
                <ul className="space-y-2 mb-6">
                  {service.details.map((detail, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  whileHover={{ x: 4 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
                >
                  Learn More <ArrowRight size={16} />
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
