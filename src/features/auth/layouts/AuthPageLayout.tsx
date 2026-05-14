import { Link, Outlet } from 'react-router-dom';

export const AuthPageLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-ui-bg font-sans text-ui-text overflow-x-hidden relative">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dots opacity-[0.4] pointer-events-none" />
      
      <div className="flex w-full items-center justify-center py-12 px-4 sm:px-8 relative z-10">
        <div className="w-full max-w-[440px] flex flex-col items-center">
          {/* Logo / Home Link */}
          <Link to="/" className="mb-10 group flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-hover:text-black transition-colors">
                ENVOY
            </span>
          </Link>

          <div className="w-full p-6 sm:p-10 bg-ui-surface rounded-[32px] border-2 border-ui-border shadow-2xl shadow-black/5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
