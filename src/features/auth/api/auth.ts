import { apiClient } from '../../../lib/api-client';

const api = apiClient;

export interface WorkspaceResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      UserID: string;
      Email: string;
      Name: string;
      hasWorkspace: boolean;
    };
    workspace: {
      WorkspaceID: string;
      WorkSpaceName: string;
      Slug: string;
      environments: Array<{
        id: string;
        name: string;
      }>;
    };
  };
}

export const login = async (data: any) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const createWorkspace = async (data: {
  workspace_name: string;
}): Promise<WorkspaceResponse> => {
  const response = await api.post('auth/onboarding', data);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await api.get(`/auth/verify?token=${token}`);
  return response.data;
};

export const resendEmail = async (email: string) => {
  const response = await api.post('/auth/resend-email', { email });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};
