import React from 'react';
import { z } from 'zod';
import { Form, FormField } from '../../../components/ui';
import { Spinner } from '../../../components/ui/spinner';
import { useAuth } from '../hooks/useAuth';
import { AuthFormShell } from './AuthFormShell';

const RegisterSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Invalid email address'),
  password: z.string().min(8, 'Min 8 characters'),
});

export const RegisterForm: React.FC = () => {
  const { handleRegister, isLoading, error } = useAuth();

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    const payload = {
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      password: data.password
    };
    handleRegister(payload);
  };

  return (
    <AuthFormShell 
      title="Create account" 
      subtitle="The first step to modern delivery."
      error={error}
    >
      <Form schema={RegisterSchema} onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField name="firstName" label="First name" placeholder="First Name" />
          <FormField name="lastName" label="Last name" placeholder="Last Name" />
        </div>

        <FormField name="email" label="Email address" placeholder="Enter your email" />
        <FormField name="password" label="Password" type="password" placeholder="••••••••" />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-black text-white font-bold text-[14px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 shadow-(--black-10) disabled:opacity-70"
        >
          {isLoading ? (
            <><Spinner className="size-5 text-white" /> Registering...</>
          ) : (
            "Continue"
          )}
        </button>
      </Form>
    </AuthFormShell>
  );
};
