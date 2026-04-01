import { motion } from 'framer-motion';

/**
 * Loading Spinner Component
 * Reusable spinner for data loading states
 */
export function LoadingSpinner({
  size = 'md',
  fullPage = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}) {
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

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const container = fullPage ? (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${sizes[size]} relative`}>
        <motion.div
          variants={spinnerVariants}
          animate="animate"
          className={`${sizes[size]} border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full`}
        />
        <div className={`absolute inset-0 ${sizes[size]} border-2 border-transparent border-b-cyan-400 rounded-full opacity-50`} />
      </div>
    </div>
  ) : (
    <div className={`${sizes[size]} relative`}>
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className={`${sizes[size]} border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full`}
      />
      <div className={`absolute inset-0 ${sizes[size]} border-2 border-transparent border-b-cyan-400 rounded-full opacity-50`} />
    </div>
  );

  return container;
}

export default LoadingSpinner;
