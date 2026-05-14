import React from 'react';
import { SocialAuth } from './SocialAuth';

interface AuthFormShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  showSocial?: boolean;
  error?: string | null;
}

export const AuthFormShell: React.FC<AuthFormShellProps> = ({ 
  title, 
  subtitle, 
  children, 
  showSocial = true,
  error 
}) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-black mb-2">{title}</h1>
        <p className="text-black/40 text-[14px] sm:text-[16px] font-bold leading-relaxed">{subtitle}</p>
      </div>

      {showSocial && <SocialAuth />}

      {/* Reusable Error Component */}
      {error && (
        <div className="p-2 text-red-500 text-[13px] text-center font-medium rounded-xl mb-6">
          {error}
        </div>
      )}

      {children}
    </div>
  );
};
