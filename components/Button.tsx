import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-black text-white hover:bg-brand-gray border border-brand-black",
    secondary: "bg-brand-white text-brand-black hover:bg-gray-100 border border-gray-200",
    outline: "bg-transparent text-brand-black border border-brand-black hover:bg-brand-black hover:text-white",
    ghost: "bg-transparent text-brand-black hover:bg-gray-100 border-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
