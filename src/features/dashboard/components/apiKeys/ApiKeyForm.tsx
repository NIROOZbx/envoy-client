import React from 'react';
import { z } from 'zod';
import { Form, FormField, FormSection } from '@/components/ui/Form';
import type { CreateAPIKeyRequest } from '../../api/apiKeys';

interface ApiKeyFormProps {
  onSubmit: (data: CreateAPIKeyRequest) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const schema = z.object({
  label: z.string().min(3, 'Label must be at least 3 characters').max(50, 'Label too long'),
  expires_in: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number().min(1, 'Expiration must be at least 1 day')
  ),
});

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const defaultValues = {
    label: '',
    expires_in: 30, // Default 30 days
  };

  return (
    <Form
      schema={schema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      className="space-y-6"
    >
      <FormSection
        title="Identity"
        description="Give your key a recognizable name"
      >
        <FormField
          name="label"
          label="Label"
          placeholder="e.g. Production Backend Service"
        />
      </FormSection>

      <FormSection
        title="Expiration"
        description="Set how long this key remains valid"
      >
        <FormField
          name="expires_in"
          label="Validity (Days)"
          type="number"
          placeholder="30"
        />
        <p className="text-[9px] font-bold text-ui-muted uppercase opacity-40 px-1">
          Keys automatically expire after the set duration for security. Recommended: 30-90 days.
        </p>
      </FormSection>

      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-ui-muted hover:text-black hover:bg-black/5 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate API Key'}
        </button>
      </div>
    </Form>
  );
};
