import { apiClient } from '../../../lib/api-client';

const api = apiClient;

export interface CreateLayoutRequest {
  name: string;
  html: string;
  is_default?: boolean;
}

export interface UpdateLayoutRequest {
  name?: string;
  html?: string;
}

export interface LayoutResponse {
  id: string;
  workspace_id: string;
  name: string;
  html: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// ─── API Methods ──────────────────────────────────────────────────────────────
// NOTE: Environment ID is automatically injected via axios interceptor.

export const createLayout = async (data: CreateLayoutRequest): Promise<LayoutResponse> => {
  const response = await api.post('/workspaces/current/layouts', data);
  return response.data.data;
};

export const getLayouts = async (): Promise<LayoutResponse[]> => {
  const response = await api.get('/workspaces/current/layouts');
  return response.data.data || [];
};

export const getLayoutById = async (layoutId: string): Promise<LayoutResponse> => {
  const response = await api.get(`/workspaces/current/layouts/${layoutId}`);
  return response.data.data;
};

export const updateLayout = async (
  layoutId: string,
  data: UpdateLayoutRequest,
): Promise<LayoutResponse> => {
  const response = await api.patch(`/workspaces/current/layouts/${layoutId}`, data);
  return response.data.data;
};

export const deleteLayout = async (layoutId: string): Promise<void> => {
  await api.delete(`/workspaces/current/layouts/${layoutId}`);
};

export const setLayoutAsDefault = async (layoutId: string): Promise<LayoutResponse> => {
  const response = await api.patch(`/workspaces/current/layouts/${layoutId}/default`, {});
  return response.data.data;
};
