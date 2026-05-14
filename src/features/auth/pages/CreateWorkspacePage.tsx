import React, { useState } from 'react';
import { z } from 'zod';
import { Form, FormField } from '../../../components/ui';
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
  const [formData, setFormData] = useState<{ workspace_name: string } | null>(null);

  const onSubmit = async (data: { workspace_name: string }) => {
    setFormData(data);
    setShowLoader(true);
  };

  const onLoaderComplete = async () => {
    if (!formData) return;
    setIsSubmitting(true);
    try {
      // Default to "free" plan on initial onboarding
      await handleCreateWorkspace({ ...formData, plan_name: 'free' });
    } catch (err) {
      setShowLoader(false);
      setIsSubmitting(false);
    }
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
          Create Workspace
        </button>
      </Form>
    </AuthFormShell>
  );
};
