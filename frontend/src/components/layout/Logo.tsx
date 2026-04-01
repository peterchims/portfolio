import { motion } from 'framer-motion';

export function Peter4TechLogo({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={`w-10 h-10 ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" />
          <stop offset="50%" stopColor="#7B2CBF" />
          <stop offset="100%" stopColor="#FF006E" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.3" />

      {/* Tech nodes - representing interconnected systems */}
      <motion.circle
        cx="100"
        cy="60"
        r="12"
        fill="url(#logoGradient)"
        filter="url(#glow)"
        initial={{ r: 8, opacity: 0 }}
        animate={{ r: 12, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      />
      <motion.circle
        cx="140"
        cy="100"
        r="12"
        fill="url(#logoGradient)"
        filter="url(#glow)"
        initial={{ r: 8, opacity: 0 }}
        animate={{ r: 12, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <motion.circle
        cx="100"
        cy="140"
        r="12"
        fill="url(#logoGradient)"
        filter="url(#glow)"
        initial={{ r: 8, opacity: 0 }}
        animate={{ r: 12, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
      <motion.circle
        cx="60"
        cy="100"
        r="12"
        fill="url(#logoGradient)"
        filter="url(#glow)"
        initial={{ r: 8, opacity: 0 }}
        animate={{ r: 12, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />

      {/* Center tech circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="18"
        fill="url(#logoGradient)"
        filter="url(#glow)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      />

      {/* Connecting lines */}
      <motion.line
        x1="100" y1="72" x2="100" y2="88"
        stroke="url(#logoGradient)" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.line
        x1="128" y1="100" x2="112" y2="100"
        stroke="url(#logoGradient)" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />
      <motion.line
        x1="100" y1="112" x2="100" y2="128"
        stroke="url(#logoGradient)" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />
      <motion.line
        x1="72" y1="100" x2="88" y2="100"
        stroke="url(#logoGradient)" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />

      {/* "4" text in center */}
      <text x="100" y="108" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white" fontFamily="monospace">
        4
      </text>

      {/* Animated orbit */}
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        opacity="0.2"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </motion.svg>
  );
}

export default Peter4TechLogo;
