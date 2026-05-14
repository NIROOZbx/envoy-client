import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthFormShell } from '../components/AuthFormShell';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../../../components/ui/spinner';

export const CheckEmailPage: React.FC = () => {
  const location = useLocation();
  const { handleResendEmail, isLoading } = useAuth();
  const email = location.state?.email || 'your email';

  return (
    <AuthFormShell 
      title="Check your email" 
      subtitle={`We've sent a verification link to ${email}`}
    >
      <div className="flex flex-col items-center justify-center py-10">
        <div className="size-20 bg-black rounded-3xl flex items-center justify-center shadow-2xl shadow-black/20 mb-8 animate-in zoom-in duration-500">
          <Mail className="size-10 text-white" />
        </div>
        
        <p className="text-center text-ui-muted text-sm max-w-[280px] mb-10 leading-relaxed">
          Click the link in the email to verify your account and get started.
        </p>

        <button
          onClick={() => handleResendEmail(email)}
          disabled={isLoading}
          className="w-full h-12 bg-black text-white font-bold text-[14px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-(--black-10) disabled:opacity-70"
        >
          {isLoading ? (
            <><Spinner className="size-5 text-white" /> Sending...</>
          ) : (
            "Resend Email"
          )}
        </button>

        <Link 
          to="/login" 
          className="mt-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
        >
          <ArrowLeft className="size-3" />
          Back to Login
        </Link>
      </div>
    </AuthFormShell>
  );
};
