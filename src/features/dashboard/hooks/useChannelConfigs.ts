import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  listChannelConfigs,
  getChannelConfig,
  createChannelConfig,
  updateChannelConfig,
  deleteChannelConfig,
  setDefaultChannelConfig,
  type CreateChannelConfigRequest,
  type UpdateChannelConfigRequest,
} from '../api/channelConfigs';

export const useChannelConfigs = () => {
  const queryClient = useQueryClient();

  const {
    data: configs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['channelConfigs'],
    queryFn: () => listChannelConfigs(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateChannelConfigRequest) => createChannelConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelConfigs'] });
      toast.success('Channel configuration created successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create channel configuration');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ configId, data }: { configId: string; data: UpdateChannelConfigRequest }) =>
      updateChannelConfig(configId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelConfigs'] });
      toast.success('Channel configuration updated');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update channel configuration');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (configId: string) => deleteChannelConfig(configId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelConfigs'] });
      toast.success('Channel configuration removed');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete channel configuration');
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: (configId: string) => setDefaultChannelConfig(configId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelConfigs'] });
      toast.success('Default channel set');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to set default channel');
    },
  });

  return {
    configs,
    isLoading,
    error,
    createConfig: createMutation.mutateAsync,
    updateConfig: updateMutation.mutateAsync,
    deleteConfig: deleteMutation.mutateAsync,
    setDefaultConfig: setDefaultMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isSettingDefault: setDefaultMutation.isPending,
  };
};

export const useChannelConfig = (configId: string) => {
  return useQuery({
    queryKey: ['channelConfig', configId],
    queryFn: () => getChannelConfig(configId),
    enabled: !!configId,
  });
};
