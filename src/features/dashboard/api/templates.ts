import { apiClient } from '../../../lib/api-client';

const api = apiClient;

export interface CreateTemplateRequest {
  name: string;
  event_type: string;
  description?: string;
  layout_id?: string;
}

export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  layout_id?: string;
  status?: 'draft' | 'live' | 'dropped';
}

export interface TemplateResponse {
  id: string;
  workspace_id: string;
  environment_id: string;
  layout_id: string | null;
  name: string;
  description: string;
  event_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// ─── API Methods ──────────────────────────────────────────────────────────────
// NOTE: Environment ID is automatically injected via axios interceptor.

export const createTemplate = async (data: CreateTemplateRequest): Promise<TemplateResponse> => {
  const response = await api.post('/workspaces/current/templates', data);
  return response.data.data;
};

export const getTemplates = async (): Promise<TemplateResponse[]> => {
  const response = await api.get('/workspaces/current/templates');
  return response.data.data || [];
};

export const getTemplateById = async (templateId: string): Promise<TemplateResponse> => {
  const response = await api.get(`/workspaces/current/templates/${templateId}`);
  return response.data.data;
};

export const updateTemplate = async (
  templateId: string, 
  data: UpdateTemplateRequest
): Promise<TemplateResponse> => {
  const response = await api.patch(`/workspaces/current/templates/${templateId}`, data);
  return response.data.data;
};

export const deleteTemplate = async (templateId: string): Promise<void> => {
  await api.delete(`/workspaces/current/templates/${templateId}`);
};
