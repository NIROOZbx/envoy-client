import React, { useState } from 'react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Spinner, Form, FormField, FormTextArea, FormSection, FormDropdown } from '@/components/ui';
import { CHANNEL_OPTIONS, CHANNEL_FIELDS, DEFAULT_CONTENT } from './channelConfig';
import { useChannelConfigs } from '../../hooks/useChannelConfigs';
import type { 
  ChannelType, 
  CreateTemplateChannelRequest, 
  UpdateTemplateChannelRequest, 
  TemplateChannelResponse 
} from '../../api/templateChannels';

// ─── Dynamic Schema ────────────────────────────────────────────────────────────

const baseSchema = z.object({
  channel: z.string().optional(),
  channel_config_id: z.string().optional().nullable(),
  content: z.record(z.string(), z.string().min(1, 'This field is required')),
});

type ChannelFormData = z.infer<typeof baseSchema>;

// ─── Sub-components ────────────────────────────────────────────────────────────

const ChannelTypeSelector = ({
  value,
  onChange,
}: {
  value: ChannelType;
  onChange: (v: ChannelType) => void;
}) => (
  <div className="grid grid-cols-5 gap-2">
    {CHANNEL_OPTIONS.map(({ value: opt, label, icon: Icon }) => (
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt)}
        className={cn(
          'flex flex-col items-center gap-2 py-3 rounded-xl border text-xs font-black uppercase tracking-wider transition-all',
          value === opt
            ? 'bg-black text-white border-black shadow-lg shadow-black/10'
            : 'bg-black/[0.02] border-ui-border text-ui-muted hover:border-black/20 hover:bg-black/5',
        )}
      >
        <Icon className="w-4 h-4" />
        <span className="text-[9px]">{label}</span>
      </button>
    ))}
  </div>
);

const DynamicContentFields = ({ channel }: { channel: ChannelType }) => {
  return (
    <div className="space-y-4">
      {CHANNEL_FIELDS[channel].map(({ key, label, multiline, json }) => {
        const name = `content.${key}`;
        return multiline ? (
          <FormTextArea
            key={key}
            name={name}
            label={label}
            placeholder={`Enter ${label.toLowerCase()}...`}
            rows={json ? 6 : 4}
            className={json ? 'font-mono text-xs' : ''}
          />
        ) : (
          <FormField
            key={key}
            name={name}
            label={label}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        );
      })}
    </div>
  );
};

// ─── ChannelForm ───────────────────────────────────────────────────────────────

export interface ChannelFormProps {
  mode: 'create' | 'edit';
  channel?: TemplateChannelResponse;
  onSubmit: (data: CreateTemplateChannelRequest | UpdateTemplateChannelRequest) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
}

export const ChannelForm: React.FC<ChannelFormProps> = ({
  mode,
  channel,
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const { configs } = useChannelConfigs();
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>(
    (channel?.channel as ChannelType) ?? 'email'
  );

  const initialValues = {
    channel: selectedChannel,
    channel_config_id: channel?.channel_config_id ?? '',
    content: channel?.content ?? DEFAULT_CONTENT[selectedChannel],
  };

  const providerOptions = [
    { id: '', label: 'Default Provider' },
    ...configs
      .filter((c) => c.channel === selectedChannel && c.is_active)
      .map((c) => ({
        id: c.id,
        label: `${c.display_name} (${c.provider})`,
      })),
  ];

  const handleFormSubmit = async (values: ChannelFormData) => {
    const data = {
      ...values,
      channel: selectedChannel,
      channel_config_id: values.channel_config_id || null,
    };
    
    if (mode === 'create') {
      await onSubmit(data as CreateTemplateChannelRequest);
    } else {
      await onSubmit({ 
        content: values.content, 
        is_active: channel?.is_active 
      } as UpdateTemplateChannelRequest);
    }
  };

  return (
    <Form
      key={mode === 'create' ? selectedChannel : 'edit'}
      schema={baseSchema}
      onSubmit={handleFormSubmit}
      defaultValues={initialValues}
      className="space-y-6"
    >
      {mode === 'create' && (
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-ui-muted">
            Channel Type
          </label>
          <ChannelTypeSelector
            value={selectedChannel}
            onChange={(ch) => setSelectedChannel(ch)}
          />
        </div>
      )}

      <FormSection
        step={1}
        title="Configuration"
        description="Select your delivery provider"
      >
        <FormDropdown
          name="channel_config_id"
          label="Provider Config"
          options={providerOptions}
          placeholder="Select a provider..."
        />
      </FormSection>

      <FormSection
        step={2}
        title="Message Content"
        description="Draft your notification payload"
      >
        <DynamicContentFields channel={selectedChannel} />
      </FormSection>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/10"
        >
          {isLoading && <Spinner className="w-4 h-4 text-white" />}
          {mode === 'create' ? 'Add Channel' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-3 rounded-xl border border-ui-border font-black text-[10px] uppercase tracking-[0.15em] text-ui-muted hover:bg-black/5 transition-all"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};
