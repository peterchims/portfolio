// ui/CustomText.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import cn from '../../lib/utils/cn';

interface CustomTextProps {
  children: React.ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body'
    | 'caption'
    | 'overline';
  font?: 'roboto' | 'raleway' | 'bricolage' | 'system';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'muted'
    | 'white'
    | 'gradient'
    | 'text';
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
  color = 'text',
  align = 'left',
  className = '',
  animated = false,
  delay = 0,
}) => {
  const { colors } = useTheme();
  const Component = variant.startsWith('h') ? variant : 'p';

  const fontClasses = {
    roboto: 'font-roboto',
    raleway: 'font-raleway',
    bricolage: 'font-bricolage',
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

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const animationClasses = animated ? 'fade-in-up' : '';
  const staggerClass = delay > 0 ? `stagger-${Math.min(delay, 5)}` : '';

  const colorStyles: React.CSSProperties = {
    color:
      color === 'primary'
        ? colors.primary
        : color === 'secondary'
          ? colors.secondary
          : color === 'accent'
            ? colors.accent
            : color === 'muted'
              ? colors.mutedText
              : color === 'white'
                ? colors.white
                : color === 'gradient'
                  ? `linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary})`
                  : colors.text,
  };

  return React.createElement(
    Component,
    {
      className: cn(
        fontClasses[font],
        variantClasses[variant],
        weightClasses[weight],
        alignClasses[align],
        animationClasses,
        staggerClass,
        className
      ),
      style:
        color === 'gradient'
          ? {
              background: colorStyles.color,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
          : colorStyles,
    },
    children
  );
};

export default CustomText;
