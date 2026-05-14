import { apiClient } from '../../../lib/api-client';

const api = apiClient;

export type ChannelType = 'email' | 'sms' | 'push' | 'in_app' | 'slack'|'webhook';

export interface TemplateChannelResponse {
  id: string;
  template_id: string;
  channel_config_id: string | null;
  channel: ChannelType;
  content: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTemplateChannelRequest {
  channel_config_id?: string;
  channel: string;
  is_active?: boolean;
  content: Record<string, any>;
}

export interface UpdateTemplateChannelRequest {
  is_active?: boolean;
  content?: Record<string, any>;
}

// ─── API Methods ──────────────────────────────────────────────────────────────
// NOTE: Environment ID is automatically injected via axios interceptor.

export const listTemplateChannels = async (
  templateId: string
): Promise<TemplateChannelResponse[]> => {
  const response = await api.get(`/workspaces/current/templates/${templateId}/channels`);
  return response.data.data || [];
};

export const getTemplateChannel = async (
  templateId: string,
  channelId: string
): Promise<TemplateChannelResponse> => {
  const response = await api.get(`/workspaces/current/templates/${templateId}/channels/${channelId}`);
  return response.data.data;
};

export const createTemplateChannel = async (
  templateId: string,
  data: CreateTemplateChannelRequest
): Promise<TemplateChannelResponse> => {
  const response = await api.post(`/workspaces/current/templates/${templateId}/channels`, data);
  return response.data.data;
};

export const updateTemplateChannel = async (
  templateId: string,
  channelId: string,
  data: UpdateTemplateChannelRequest
): Promise<TemplateChannelResponse> => {
  const response = await api.patch(
    `/workspaces/current/templates/${templateId}/channels/${channelId}`,
    data
  );
  return response.data.data;
};

export const deleteTemplateChannel = async (
  templateId: string,
  channelId: string
): Promise<void> => {
  await api.delete(`/workspaces/current/templates/${templateId}/channels/${channelId}`);
};
