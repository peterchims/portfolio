import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Clients Served',
    value: '50+',
    description: 'From startups to enterprises',
  },
  {
    icon: TrendingUp,
    label: 'Projects Delivered',
    value: '120+',
    description: 'Successfully completed',
  },
  {
    icon: Clock,
    label: 'Years Experience',
    value: '8+',
    description: 'In full-stack development',
  },
  {
    icon: Award,
    label: 'Success Rate',
    value: '98%',
    description: 'Client satisfaction',
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export function MetricsSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-black via-purple-900/10 to-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            Proven Track Record
          </h2>
          <p className="text-base md:text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Numbers that speak to quality and reliability
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group text-center"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ y: -8 }}
                  className="mb-6 p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit mx-auto group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-2"
                >
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </motion.div>

                <p className="text-white font-semibold mb-2">{stat.label}</p>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
