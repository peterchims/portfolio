import React from 'react';

interface CustomTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';
  font?: 'roboto' | 'raleway' | 'system';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'white' | 'gradient';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  animated?: boolean;
  delay?: number;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = 'body',
  font = 'raleway',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  className = '',
  animated = false,
  delay = 0,
}) => {
  const Component = variant.startsWith('h') ? variant : 'p';

  const fontClasses = {
    roboto: 'font-roboto',
    raleway: 'font-raleway',
    system: 'font-system',
  };

  const variantClasses = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug',
    h4: 'text-xl md:text-2xl lg:text-3xl font-medium leading-snug',
    h5: 'text-lg md:text-xl lg:text-2xl font-medium leading-normal',
    h6: 'text-base md:text-lg lg:text-xl font-medium leading-normal',
    body: 'text-sm md:text-base lg:text-lg leading-relaxed',
    caption: 'text-xs md:text-sm leading-relaxed',
    overline: 'text-xs font-semibold uppercase tracking-wider leading-normal',
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    accent: 'text-lime-500',
    muted: 'text-gray-500',
    white: 'text-white',
    gradient: 'gradient-text',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const animationClasses = animated ? 'fade-in-up' : '';
  const staggerClass = delay > 0 ? `stagger-${Math.min(delay, 5)}` : '';

  return React.createElement(
    Component,
    {
      className: `
        ${fontClasses[font]}
        ${variantClasses[variant]}
        ${weightClasses[weight]}
        ${colorClasses[color]}
        ${alignClasses[align]}
        ${animationClasses}
        ${staggerClass}
        ${className}
      `.trim().replace(/\s+/g, ' '),
    },
    children
  );
};

export default CustomText;