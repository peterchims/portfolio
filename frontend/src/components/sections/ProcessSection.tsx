import { motion } from 'framer-motion';
import { Lightbulb, Pencil, Code2, Rocket, BarChart3, HeartHandshake } from 'lucide-react';

const processSteps = [
  {
    icon: Lightbulb,
    step: '01',
    title: 'Discovery & Strategy',
    description: 'Understand your goals, audience, and business challenges to craft the perfect strategy',
  },
  {
    icon: Pencil,
    step: '02',
    title: 'Design & Planning',
    description: 'Create detailed designs, wireframes, and technical specifications',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Development',
    description:
      'Build your solution using modern technologies and best practices with continuous updates',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Testing & Deployment',
    description: 'Rigorous testing, optimization, and seamless deployment to production',
  },
  {
    icon: BarChart3,
    step: '05',
    title: 'Monitoring & Analytics',
    description: 'Track performance, gather insights, and identify optimization opportunities',
  },
  {
    icon: HeartHandshake,
    step: '06',
    title: 'Support & Growth',
    description: 'Ongoing maintenance, updates, and scaling as your business grows',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ProcessSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-black via-purple-900/5 to-black">
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
            Methodology
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            How We Work Together
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            A proven 6-step process ensuring quality, communication, and results
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {processSteps.map((processItem, idx) => {
            const Icon = processItem.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative"
              >
                {/* Card */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/20 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 h-full backdrop-blur">
                  {/* Step Number */}
                  <div className="absolute top-6 right-6 text-5xl font-bold text-gray-800/20 group-hover:text-cyan-500/10 transition-colors">
                    {processItem.step}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{processItem.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{processItem.description}</p>

                  {/* Arrow Indicator */}
                  {idx < processSteps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 hidden lg:block">
                      <div className="w-8 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Ready to start your journey? Let's discuss how we can bring your vision to life.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Schedule Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
