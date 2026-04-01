/**
 * Professional Peter4Tech Logo Component
 * Premium, solid design with dark theme
 * Features gradient, clean typography, and tech symbolism
 */
export function Peter4TechLogoV2() {
  return (
    <svg
      viewBox="0 0 120 120"
      width="40"
      height="40"
      className="w-10 h-10"
    >
      <defs>
        {/* Gradient definitions */}
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        
        <linearGradient id="accentGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle
        cx="60"
        cy="60"
        r="58"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
        opacity="0.3"
      />

      {/* Main geometric shape - represent "4" in tech context */}
      <g filter="url(#glow)">
        {/* Top horizontal bar */}
        <rect
          x="20"
          y="20"
          width="60"
          height="8"
          rx="4"
          fill="url(#logoGradient)"
        />

        {/* Vertical bar on right */}
        <rect
          x="70"
          y="20"
          width="8"
          height="60"
          rx="4"
          fill="url(#accentGradient)"
        />

        {/* Middle horizontal connector */}
        <rect
          x="20"
          y="50"
          width="50"
          height="8"
          rx="4"
          fill="url(#logoGradient)"
          opacity="0.8"
        />

        {/* Bottom vertical */}
        <rect
          x="20"
          y="60"
          width="8"
          height="40"
          rx="4"
          fill="url(#accentGradient)"
          opacity="0.9"
        />
      </g>

      {/* Tech accent - small circuit-like dots */}
      <circle cx="45" cy="35" r="2.5" fill="url(#logoGradient)" opacity="0.6" />
      <circle cx="85" cy="50" r="2.5" fill="url(#accentGradient)" opacity="0.6" />
      <circle cx="55" cy="95" r="2.5" fill="url(#logoGradient)" opacity="0.6" />

      {/* Connecting lines - subtle tech aesthetic */}
      <line
        x1="45"
        y1="35"
        x2="85"
        y2="50"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="3,3"
      />
      <line
        x1="85"
        y1="50"
        x2="55"
        y2="95"
        stroke="url(#accentGradient)"
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="3,3"
      />
    </svg>
  );
}

/**
 * Extended Logo with text
 * Use when more space is available
 */
export function Peter4TechLogoExtended() {
  return (
    <div className="flex items-center gap-2">
      <Peter4TechLogoV2 />
      <div>
        <div className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          PETER4TECH
        </div>
        <div className="text-xs text-cyan-400/70 font-medium">
          Digital Solutions
        </div>
      </div>
    </div>
  );
}

export default Peter4TechLogoV2;
