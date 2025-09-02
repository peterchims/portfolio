import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg
    transition-all duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    relative overflow-hidden group
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-lime-400 to-green-500 hover:from-lime-500 hover:to-green-600
      text-white shadow-lg hover:shadow-xl
      focus:ring-lime-500
      before:absolute before:inset-0 before:bg-white before:opacity-0 
      before:transition-opacity before:duration-300 hover:before:opacity-10
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900
      text-white shadow-md hover:shadow-lg
      focus:ring-gray-500
    `,
    outline: `
      border-2 border-lime-400 text-lime-600 hover:bg-lime-400 hover:text-white
      shadow-sm hover:shadow-md
      focus:ring-lime-500
    `,
    ghost: `
      text-gray-700 hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-300
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
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