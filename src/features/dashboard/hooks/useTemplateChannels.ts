import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../store/authStore';
import { toast } from 'sonner';
import {
  listTemplateChannels,
  getTemplateChannel,
  createTemplateChannel,
  deleteTemplateChannel,
  updateTemplateChannel,
} from '../api/templateChannels';
import type { CreateTemplateChannelRequest, UpdateTemplateChannelRequest } from '../api/templateChannels';

const getApiError = (error: any, fallback: string) =>
  error?.response?.data?.error || error?.response?.data?.message || fallback;

export const useTemplateChannel = (templateId: string, channelId: string) => {
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);

  const channelQuery = useQuery({
    queryKey: ['template-channel', templateId, channelId, activeEnvironmentId],
    queryFn: () => getTemplateChannel(templateId, channelId),
    enabled: !!templateId && !!channelId && !!activeEnvironmentId,
  });

  return {
    channel: channelQuery.data,
    isLoading: channelQuery.isLoading,
    error: channelQuery.error,
  };
};

export const useTemplateChannels = (templateId: string) => {
  const queryClient = useQueryClient();
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);
  const queryKey = ['template-channels', templateId, activeEnvironmentId];
  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const channelsQuery = useQuery({
    queryKey,
    queryFn: () => listTemplateChannels(templateId),
    enabled: !!templateId && !!activeEnvironmentId,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTemplateChannelRequest) =>
      createTemplateChannel(templateId, data),
    onSuccess: () => { toast.success('Channel added'); invalidate(); },
    onError: (e: any) => toast.error(getApiError(e, 'Failed to add channel')),
  });

  const updateMutation = useMutation({
    mutationFn: ({ channelId, data }: { channelId: string; data: UpdateTemplateChannelRequest }) =>
      updateTemplateChannel(templateId, channelId, data),
    onSuccess: () => { toast.success('Channel updated'); invalidate(); },
    onError: (e: any) => toast.error(getApiError(e, 'Failed to update channel')),
  });

  const deleteMutation = useMutation({
    mutationFn: (channelId: string) => deleteTemplateChannel(templateId, channelId),
    onSuccess: () => { toast.success('Channel removed'); invalidate(); },
    onError: (e: any) => toast.error(getApiError(e, 'Failed to remove channel')),
  });

  return {
    channels: channelsQuery.data || [],
    isLoading: channelsQuery.isLoading,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    addChannel: createMutation.mutateAsync,
    updateChannel: updateMutation.mutateAsync,
    removeChannel: deleteMutation.mutateAsync,
  };
};
