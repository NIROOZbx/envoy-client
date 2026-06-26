import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Form, FormField, Spinner } from '../../../components/ui';
import { AuthFormShell } from '../components/AuthFormShell';
import { useAuth } from '../hooks/useAuth';
import { OnboardingLoader } from '@/features/dashboard/components/onboarding/OnboardingLoader';

const WorkspaceSchema = z.object({
  workspace_name: z.string().min(2, 'Workspace name must be at least 2 characters'),
});

export const CreateWorkspacePage: React.FC = () => {
  const { handleCreateWorkspace, error } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: { workspace_name: string }) => {
    setIsSubmitting(true);
    // Call the backend first. Default to "free" plan on initial onboarding
    const result = await handleCreateWorkspace({ ...data, plan_name: 'free' }, true);
    
    if (result && result.success) {
      setShowLoader(true);
    } else {
      setIsSubmitting(false);
    }
  };

  const onLoaderComplete = () => {
    navigate('/dashboard');
  };

  if (showLoader) {
    return <OnboardingLoader onComplete={onLoaderComplete} />;
  }

  return (
    <AuthFormShell 
      title="Set up workspace" 
      subtitle="Create a shared environment for your notifications."
      showSocial={false}
    >
      <Form schema={WorkspaceSchema} onSubmit={onSubmit} className="space-y-5">
        <FormField
          name="workspace_name"
          label="Workspace Name"
          placeholder="e.g. Acme Production"
        />

        {error && (
          <p className="text-[13px] text-red-500 px-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-ui-text text-ui-bg rounded-xl font-bold text-[14px] hover:opacity-90 active:scale-[0.98] transition-all mt-6 flex items-center justify-center gap-2 shadow-xl shadow-ui-text/10 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Spinner className="w-4 h-4 text-ui-bg" />
              Creating...
            </>
          ) : (
            'Create Workspace'
          )}
        </button>
      </Form>
    </AuthFormShell>
  );
};
