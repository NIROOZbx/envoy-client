import { apiClient } from '../../../lib/api-client';

const api = apiClient;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface APIKeyInfo {
  id: string;
  label: string;
  key_hint: string;
  environment_id: string;
  is_revoked: boolean;
  revoked_at: string | null;
  expires_at: string | null;
  last_used_at: string | null;
  created_at: string;
}

export interface CreateAPIKeyResponse extends APIKeyInfo {
  raw_key: string;
}

export interface CreateAPIKeyRequest {
  label: string;
  expires_in: number;
}

// ─── API Methods ──────────────────────────────────────────────────────────────
// NOTE: Environment ID is automatically injected via axios interceptor for write ops.
// GET requests for keys specifically use the 'env_id' query param as per backend requirement.

export const listApiKeys = async (environmentId: string): Promise<APIKeyInfo[]> => {
  if (!environmentId) return [];
  
  const response = await api.get('/workspaces/current/api-keys', {
    params: { env_id: environmentId },
  });
  
  return response.data.data || [];
};

export const createApiKey = async (data: CreateAPIKeyRequest): Promise<CreateAPIKeyResponse> => {
  const response = await api.post('/workspaces/current/api-keys', data);
  return response.data.data;
};

export const deleteApiKey = async (keyId: string): Promise<void> => {
  await api.delete(`/workspaces/current/api-keys/${keyId}`);
};

export const revokeApiKey = async (keyId: string): Promise<void> => {
  await api.patch(`/workspaces/current/api-keys/${keyId}/revoke`, {});
};
