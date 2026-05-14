import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscribersApi, type SubscriberPreference } from '../api/subscribers';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

export const useSubscribers = (page = 1, pageSize = 10, search = '') => {
  const queryClient = useQueryClient();
  const environmentId = useAuthStore(state => state.activeEnvironmentId);

  const query = useQuery({
    queryKey: ['subscribers', { page, pageSize, search, environmentId }],
    queryFn: () => subscribersApi.list(page, pageSize, search),
    enabled: !!environmentId,
  });

  const deleteMutation = useMutation({
    mutationFn: subscribersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      toast.success('Subscriber deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete subscriber');
    },
  });

  return {
    ...query,
    subscribers: query.data?.subscribers || [],
    pagination: {
      totalCount: query.data?.total_count || 0,
      totalPages: query.data?.total_pages || 1,
      currentPage: query.data?.current_page || 1,
    },
    deleteSubscriber: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

export const useSubscriberPreferences = (externalUserId: string) => {
  const queryClient = useQueryClient();
  const environmentId = useAuthStore(state => state.activeEnvironmentId);

  const query = useQuery({
    queryKey: ['subscriber-preferences', externalUserId, environmentId],
    queryFn: () => subscribersApi.getPreferences(externalUserId),
    enabled: !!externalUserId && !!environmentId,
  });

  const upsertMutation = useMutation({
    mutationFn: subscribersApi.upsertPreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriber-preferences', externalUserId] });
      toast.success('Preference updated successfully');
    },
    onError: () => {
      toast.error('Failed to update preference');
    },
  });

  return {
    ...query,
    preferences: query.data || [],
    upsertPreference: upsertMutation.mutate,
    isUpdating: upsertMutation.isPending,
  };
};
