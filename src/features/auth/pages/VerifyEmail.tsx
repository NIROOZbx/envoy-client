import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { AuthFormShell } from '../components/AuthFormShell';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../../../components/ui/spinner';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { handleVerifyEmail, isLoading, error } = useAuth();
  const [success, setSuccess] = React.useState(false);
  const verificationStarted = React.useRef(false);

  useEffect(() => {
    if (token && !success && !error && !verificationStarted.current) {
      verificationStarted.current = true;
      handleVerifyEmail(token, false).then((res) => {
        if (res) setSuccess(true);
      });
    }
  }, [token, handleVerifyEmail, success, error]);

  if (isLoading) {
    return (
      <AuthFormShell title="Verifying..." subtitle="Please wait while we confirm your email.">
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner className="size-12 text-black" />
        </div>
      </AuthFormShell>
    );
  }

  if (success) {
    return (
      <AuthFormShell 
        title="Email Verified" 
        subtitle="Your account is now fully activated."
      >
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="size-20 bg-success/10 text-success rounded-3xl flex items-center justify-center mb-8 animate-in zoom-in duration-500">
            <CheckCircle2 className="size-10" />
          </div>
          
          <p className="text-ui-muted text-sm max-w-[280px] mb-10 leading-relaxed">
            Congratulations! You have successfully verified your email address.
          </p>

          <Link
            to="/dashboard"
            className="w-full h-12 bg-black text-white font-bold text-[14px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-(--black-10)"
          >
            Continue to Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </AuthFormShell>
    );
  }

  if (error) {
    return (
      <AuthFormShell 
        title="Verification Failed" 
        subtitle="The link may be expired or invalid."
      >
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="size-20 bg-destructive/10 text-destructive rounded-3xl flex items-center justify-center mb-8 animate-in zoom-in duration-500">
            <XCircle className="size-10" />
          </div>
          
          <p className="text-ui-muted text-sm max-w-[280px] mb-10 leading-relaxed">
            Don't worry, you can request a new verification link by trying to log in.
          </p>

          <Link
            to="/login"
            className="w-full h-12 bg-black text-white font-bold text-[14px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-(--black-10)"
          >
            Back to Login
          </Link>
        </div>
      </AuthFormShell>
    );
  }

  return (
    <AuthFormShell title="Verifying..." subtitle="Finalizing your registration.">
      <div className="flex flex-col items-center justify-center py-20">
        <Spinner className="size-12 text-black" />
      </div>
    </AuthFormShell>
  );
};
