import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroModern() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="animated-bg" />
      
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-block mb-6 px-6 py-2 glass-card">
              <span className="text-accent-1">✨ Welcome to Premium Portfolio</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="mb-6">
            Beautiful Design Meets Modern Technology
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            Experience a portfolio that's not just a showcase, but an interactive journey through innovation and creativity
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="btn btn-primary group">
              Explore My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </button>
            <button className="btn btn-secondary">
              Get In Touch
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <motion.div className="p-2 glass-card rounded-full">
              <ChevronDown className="w-6 h-6 text-accent-1" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
