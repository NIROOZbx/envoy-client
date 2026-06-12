import React from 'react';

export const SocialAuth: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <button
          onClick={() => window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:80/api/v1'}/auth/google`}
          className="w-full flex items-center justify-center gap-3 py-3.5  border border-black/10 rounded-xl hover:bg-pearl-hover transition-all font-medium text-[14px]"
        >
          <img src="/google.svg" alt="Google" className="w-4 h-4" />
          Continue with Google
        </button>
      </div>

      <div className="relative flex items-center mb-4">
        <div className="grow border-t border-black/5"></div>
        <span className="shrink mx-4 text-black/30 text-[13px]">or</span>
        <div className="grow border-t border-black/5"></div>
      </div>
    </div>
  );
};
