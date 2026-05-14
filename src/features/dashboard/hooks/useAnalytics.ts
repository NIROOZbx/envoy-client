import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../../store/authStore';
import { getAnalytics, type AnalyticsParams } from '../api/analytics';

export const useAnalytics = (params: AnalyticsParams) => {
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);

  return useQuery({
    queryKey: ['analytics', activeEnvironmentId, params],
    queryFn: () => getAnalytics(params),
    enabled: !!activeEnvironmentId,
    staleTime: 1000 * 60 * 5, 
  });
};
