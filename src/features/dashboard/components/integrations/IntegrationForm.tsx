import React, { useState } from 'react';
import { z } from 'zod';
import { Form, FormField, FormSection } from '@/components/ui/Form';
import { PROVIDERS, getProvider, type ProviderMetadata } from './providerConfig';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import type { ChannelConfigResponse } from '../../api/channelConfigs';

interface IntegrationFormProps {
  initialData?: ChannelConfigResponse;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  mode: 'create' | 'edit';
}

export const IntegrationForm: React.FC<IntegrationFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  mode,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<ProviderMetadata | null>(
    initialData ? (getProvider(initialData.provider) || null) : null
  );

  // Dynamic schema based on selected provider
  const schema = z.object({
    display_name: z.string().min(1, 'Display name is required'),
    credentials: z.record(z.string(), z.string()).refine((data) => {
      if (!selectedProvider) return true;
      return selectedProvider.fields.every((f) => !f.required || (data[f.key] && data[f.key].length > 0));
    }, 'Missing required credentials'),
  });

  const defaultValues = {
    display_name: initialData?.display_name || '',
    credentials: initialData?.credentials || {},
  };

  const handleSubmit = async (values: any) => {
    const payload = mode === 'create' 
      ? {
          ...values,
          provider: selectedProvider?.id,
          channel: selectedProvider?.channel,
          is_active: true,
          is_default: false,
        }
      : values;
    
    await onSubmit(payload);
  };

  return (
    <div className="space-y-8">
      {/* Provider Selection (only for create mode) */}
      {mode === 'create' && (
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-60 px-1">
            Choose Provider
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROVIDERS.map((p) => {
              const Icon = p.icon;
              const isSelected = selectedProvider?.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProvider(p)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group relative overflow-hidden",
                    isSelected 
                      ? "border-black bg-black text-white shadow-2xl shadow-black/20" 
                      : "border-ui-border bg-ui-surface hover:border-black/20"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    isSelected ? "bg-white/20" : p.color
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 z-10">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[11px] uppercase tracking-tight">{p.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-success animate-in zoom-in" />}
                    </div>
                    <p className={cn(
                      "text-[9px] font-black uppercase tracking-widest opacity-40",
                      isSelected ? "text-white" : "text-ui-muted"
                    )}>{p.channel}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Configuration Form */}
      {(selectedProvider || mode === 'edit') && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <Form
            key={selectedProvider?.id} // Force re-render when provider changes to reset fields
            schema={schema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <FormSection 
              step={1} 
              title="Identity" 
              description="Name your configuration"
            >
              <FormField
                name="display_name"
                label="Display Name"
                placeholder="e.g. Transactional Email Gateway"
              />
            </FormSection>

            <FormSection 
              step={2} 
              title="Authentication" 
              description="Configure provider credentials"
            >
              <div className="grid grid-cols-1 gap-6">
                {selectedProvider?.fields.map((field) => (
                  <FormField
                    key={field.key}
                    name={`credentials.${field.key}`}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                ))}
              </div>
            </FormSection>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-8">
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-ui-muted hover:text-black hover:bg-black/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-10 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/20 disabled:opacity-50"
              >
                {isLoading && <Spinner className="w-3 h-3 text-white" />}
                {isLoading ? 'Synchronizing...' : mode === 'create' ? 'Establish Integration' : 'Commit Changes'}
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};
