import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '../../../store/authStore';
import {
  listApiKeys,
  createApiKey,
  deleteApiKey,
  revokeApiKey,
  type CreateAPIKeyRequest,
} from '../api/apiKeys';

export const useApiKeys = () => {
  const queryClient = useQueryClient();
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);

  const {
    data: keys = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['apiKeys', activeEnvironmentId],
    queryFn: () => listApiKeys(activeEnvironmentId ?? ''),
    enabled: !!activeEnvironmentId,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateAPIKeyRequest) => createApiKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys', activeEnvironmentId] });
      toast.success('API key generated successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to generate API key');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (keyId: string) => deleteApiKey(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys', activeEnvironmentId] });
      toast.success('API key deleted');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete API key');
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (keyId: string) => revokeApiKey(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys', activeEnvironmentId] });
      toast.success('API key revoked');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to revoke API key');
    },
  });

  return {
    keys,
    isLoading,
    error,
    createApiKey: createMutation.mutateAsync,
    deleteApiKey: deleteMutation.mutateAsync,
    revokeApiKey: revokeMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isRevoking: revokeMutation.isPending,
  };
};
