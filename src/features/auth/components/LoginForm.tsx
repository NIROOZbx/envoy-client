import React from 'react';
import { z } from 'zod';
import { Form, FormField } from '../../../components/ui';
import { Spinner } from '../../../components/ui/spinner';
import { useAuth } from '../hooks/useAuth';
import { AuthFormShell } from './AuthFormShell';

const LoginSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
});

export const LoginForm: React.FC = () => {
  const { handleLogin, isLoading, error } = useAuth();

  return (
    <AuthFormShell 
      title="Sign in" 
      subtitle="Please enter your details to sign in."
      error={error}
    >
      <Form schema={LoginSchema} onSubmit={handleLogin} className="space-y-4">
        <FormField name="email" label="Email address" placeholder="Enter your email" />
        
        <div className="relative">
          <FormField name="password" label="Password" type="password" placeholder="Enter your password" />
          <a href="#" className="absolute top-0 right-1 text-[13px] font-medium text-ui-muted hover:text-black italic">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-black text-white font-bold text-[14px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
        >
          {isLoading ? (
            <><Spinner className="size-5 text-white" /> Signing in...</>
          ) : (
            "Continue"
          )}
        </button>
      </Form>
    </AuthFormShell>
  );
};
