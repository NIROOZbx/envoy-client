import { apiClient } from '../../../lib/api-client';

const api = apiClient;

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChannelType = 'email' | 'sms' | 'push' | 'in_app' | 'slack' | 'webhook';

export interface ChannelConfigResponse {
  id: string;
  workspace_id: string;
  channel: ChannelType;
  provider: string;
  display_name: string;
  credentials: Record<string, string>;
  is_active: boolean;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateChannelConfigRequest {
  channel: ChannelType;
  provider: string;
  display_name: string;
  credentials: Record<string, string>;
  is_active?: boolean;
  is_default?: boolean;
}

export interface UpdateChannelConfigRequest {
  display_name?: string;
  credentials?: Record<string, string>;
  is_active?: boolean;
}

// ─── API Methods ──────────────────────────────────────────────────────────────
// Channel configs are workspace-level, so environment ID is not required.

export const listChannelConfigs = async (): Promise<ChannelConfigResponse[]> => {
  const response = await api.get('/workspaces/current/channels');
  return response.data.data || [];
};

export const getChannelConfig = async (configId: string): Promise<ChannelConfigResponse> => {
  const response = await api.get(`/workspaces/current/channels/${configId}`);
  return response.data.data;
};

export const createChannelConfig = async (
  data: CreateChannelConfigRequest,
): Promise<ChannelConfigResponse> => {
  const response = await api.post('/workspaces/current/channels', data);
  return response.data.data;
};

export const updateChannelConfig = async (
  configId: string,
  data: UpdateChannelConfigRequest,
): Promise<ChannelConfigResponse> => {
  const response = await api.patch(`/workspaces/current/channels/${configId}`, data);
  return response.data.data;
};

export const deleteChannelConfig = async (configId: string): Promise<void> => {
  await api.delete(`/workspaces/current/channels/${configId}`);
};

export const setDefaultChannelConfig = async (configId: string): Promise<void> => {
  await api.patch(`/workspaces/current/channels/${configId}/default`, {});
};
