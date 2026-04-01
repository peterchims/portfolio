import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Idea?
          </h2>
          <p className="text-base md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Let's discuss your project and create a solution that drives real business impact
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-2xl"
            >
              Start Your Project
              <ArrowRight size={20} />
            </motion.a>

            {/* Secondary CTAs */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/234818346382?text=Hi!%20I%20want%20to%20discuss%20a%20project`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:contact@peter4tech.com"
              className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Mail size={20} />
              Email Me
            </motion.a>
          </motion.div>

          {/* Guarantee Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 pt-12 border-t border-gray-700"
          >
            <p className="text-gray-400 mb-4">✓ Free initial consultation</p>
            <p className="text-sm text-gray-500">
              No obligation. Let's explore if we're a good fit for your project.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
