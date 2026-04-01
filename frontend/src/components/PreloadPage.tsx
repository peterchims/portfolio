import { motion } from 'framer-motion';
import { Peter4TechLogoV2 } from './Peter4TechLogoV2';

/**
 * Loading/Preload Page
 * Displays while application initializes
 */
export function PreloadPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.6 },
    },
  };

  const logoVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
      },
    },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[999] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <Peter4TechLogoV2 />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-30" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Peter4Tech
          </h1>
          <p className="text-gray-300 font-medium">Digital Solutions</p>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          variants={spinnerVariants}
          animate="animate"
          className="flex justify-center"
        >
          <div className="relative w-16 h-16">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full" />
            {/* Inner ring */}
            <div className="absolute inset-2 border-2 border-transparent border-b-cyan-400 rounded-full opacity-50" />
          </div>
        </motion.div>

        {/* Status text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-gray-400 text-sm"
        >
          Initializing your experience...
        </motion.p>
      </div>
    </motion.div>
  );
}

export default PreloadPage;
