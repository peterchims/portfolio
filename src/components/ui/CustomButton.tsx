// src/ui/CustomButton.tsx
import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
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
  icon: Icon,
  iconPosition = 'left',
}) => {
  const sizeClasses: Record<Size, string> = {
    sm: 'px-3 py-1 text-sm gap-2',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-3',
  };

  const variantClasses: Record<Variant, string> = {
    primary: 'bg-green-900 text-white hover:bg-green-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-green-900 text-green-900 hover:bg-green-50',
    ghost: 'bg-transparent text-green-900 hover:bg-green-50', // your style here
  };

  const baseClasses = `
    rounded-lg font-semibold transition-all duration-300 ease-in-out
    flex items-center justify-center
    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${sizeClasses[size]} ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const iconSizeClasses: Record<Size, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      type={type}
      disabled={disabled}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={iconSizeClasses[size]} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={iconSizeClasses[size]} />
      )}
    </button>
  );
};

export default CustomButton;
