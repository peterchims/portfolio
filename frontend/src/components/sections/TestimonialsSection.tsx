import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Startup Founder',
    company: 'TechVenture Inc',
    quote:
      'Delivered exactly what we needed, on time and within budget. Extremely professional and responsive.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'Enterprise Solutions',
    quote:
      'Outstanding technical expertise. The architecture they built scales perfectly for our growth.',
    rating: 5,
  },
  {
    name: 'Emma Williams',
    role: 'Product Manager',
    company: 'Digital Innovations',
    quote:
      'Best developer collaboration experience. Clear communication and top-notch code quality throughout.',
    rating: 5,
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

export function TestimonialsSection() {
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
            Client Success
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            What Clients Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/20 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-6 flex-1 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-gray-700">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
                <p className="text-xs text-cyan-400 mt-1">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
