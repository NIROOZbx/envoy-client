import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

import { useAuthStore } from '../store/authStore';

apiClient.interceptors.request.use((config) => {
  const activeEnvironmentId = useAuthStore.getState().activeEnvironmentId;
  const url = config.url || '';
  const method = config.method?.toUpperCase();

  const isPlans = url.endsWith('/plans') && method === 'GET';
  const isSubscription = url.endsWith('/workspaces/current/subscription') && method === 'GET';
  const isMembers = url.includes('/workspaces/current/members');
  const isApiKeyList = url.endsWith('/workspaces/current/api-keys') && method === 'GET';
  const isOnboarding = url.includes('/auth/onboarding');

  if (activeEnvironmentId && !isPlans && !isSubscription && !isMembers && !isApiKeyList && !isOnboarding) {
    config.headers['X-Environment-ID'] = activeEnvironmentId;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
