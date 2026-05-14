import React from 'react';
import { Spinner } from './spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading, variant = 'primary', className, ...props }) => {
  const baseStyles = "w-full py-3.5 px-6 rounded-ui font-bold uppercase tracking-widest text-[12px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]";
  
  const variants = {
    primary: "bg-black text-pearl hover:bg-black-hover shadow-xl shadow-black/10",
    secondary: "bg-pearl border border-black/5 text-black hover:bg-pearl-hover"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} disabled={isLoading} {...props}>
      {isLoading ? (
        <Spinner className={variant === 'primary' ? 'text-pearl' : 'text-black'} />
      ) : children}
    </button>
  );
};
