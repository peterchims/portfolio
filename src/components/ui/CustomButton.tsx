// ui/CustomButton.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import cn from '../../lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'muted';
type Size = 'sm' | 'md' | 'lg';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  style?: React.CSSProperties;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  disabled = false,
  style,
  icon: Icon,
  iconPosition = 'left',
}) => {
  const { colors } = useTheme();

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm gap-2',
    md: 'px-4 py-2 text-base gap-3',
    lg: 'px-6 py-3 text-lg gap-3',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const baseClasses = cn(`
    rounded-lg font-semibold transition-all duration-300 ease-in-out
    flex items-center justify-center
    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    relative overflow-hidden group
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `);

  const buttonStyle: React.CSSProperties = {
    fontFamily: 'BricolageGrotesque, system-ui, sans-serif',
    ...style,
  };

  switch (variant) {
    case 'primary':
      Object.assign(buttonStyle, {
        backgroundColor: colors.primary,
        color: colors.surface,
        backgroundImage: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary})`,
      });
      break;
    case 'secondary':
      Object.assign(buttonStyle, {
        backgroundColor: colors.secondary,
        color: colors.text,
        backgroundImage: `linear-gradient(135deg, ${colors.grayFaded}, ${colors.secondary})`,
      });
      break;
    case 'outline':
      Object.assign(buttonStyle, {
        backgroundColor: 'transparent',
        border: `2px solid ${colors.primary}`,
        color: colors.primary,
      });
      break;
    case 'ghost':
      Object.assign(buttonStyle, {
        backgroundColor: 'transparent',
        color: colors.text,
      });
      break;
    case 'muted':
      Object.assign(buttonStyle, {
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      });
      break;
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      style={buttonStyle}
      type={type}
      disabled={disabled}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={iconSizeClasses[size]} />
      )}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={iconSizeClasses[size]} />
      )}
    </button>
  );
};

export default CustomButton;
