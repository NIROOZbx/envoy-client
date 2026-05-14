import { apiClient } from '@/lib/api-client';

export interface Subscriber {
  id: string;
  workspace_id: string;
  environment_id: string;
  external_user_id: string;
  channel: string;
  contact_value: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriberPreference {
  external_user_id: string;
  channel: string;
  event_type: string;
  is_enabled: boolean;
  updated_at:string
}

export interface SubscribersResponse {
  subscribers: Subscriber[];
  total_count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}

export const subscribersApi = {
  list: async (page = 1, pageSize = 10, search = '') => {
    const { data } = await apiClient.get<any>('/workspaces/current/subscribers', {
      params: {
        page,
        page_size: pageSize,
        search: search || undefined,
      },
    });
    return data.data as SubscribersResponse;
  },

  delete: async (id: string) => {
  
    await apiClient.delete(`/workspaces/current/subscribers/${id}`);
  },

  upsertPreference: async (preference: SubscriberPreference) => {
    await apiClient.post('/identify/preferences', preference);
  },

  getPreferences: async (externalUserId: string) => {
    const { data } = await apiClient.get<any>(`/workspaces/current/subscribers/${externalUserId}/preferences`);
    return data.data as SubscriberPreference[];
  }
};
