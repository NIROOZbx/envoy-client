import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../store/authStore';
import { 
  createLayout, 
  getLayouts, 
  deleteLayout, 
  updateLayout, 
  setLayoutAsDefault, 
  getLayoutById 
} from '../api/layouts';
import type { CreateLayoutRequest, UpdateLayoutRequest } from '../api/layouts';
import { toast } from 'sonner';

export const useLayout = (layoutId: string) => {
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);

  const layoutQuery = useQuery({
    queryKey: ['layout', layoutId, activeEnvironmentId],
    queryFn: () => getLayoutById(layoutId),
    enabled: !!layoutId && !!activeEnvironmentId,
  });

  return {
    layout: layoutQuery.data,
    isLoading: layoutQuery.isLoading,
    error: layoutQuery.error,
  };
};

export const useLayouts = () => {
  const queryClient = useQueryClient();
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);

  const layoutsQuery = useQuery({
    queryKey: ['layouts', activeEnvironmentId],
    queryFn: getLayouts,
    enabled: !!activeEnvironmentId,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateLayoutRequest) => createLayout(data),
    onSuccess: () => {
      toast.success('Layout created successfully');
      queryClient.invalidateQueries({ queryKey: ['layouts', activeEnvironmentId] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to create layout';
      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ layoutId, data }: { layoutId: string; data: UpdateLayoutRequest }) => 
      updateLayout(layoutId, data),
    onSuccess: (_, variables) => {
      toast.success('Layout updated successfully');
      queryClient.invalidateQueries({ queryKey: ['layouts', activeEnvironmentId] });
      queryClient.invalidateQueries({ queryKey: ['layout', variables.layoutId, activeEnvironmentId] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to update layout';
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (layoutId: string) => deleteLayout(layoutId),
    onSuccess: () => {
      toast.success('Layout deleted');
      queryClient.invalidateQueries({ queryKey: ['layouts', activeEnvironmentId] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to delete layout';
      toast.error(message);
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: (layoutId: string) => setLayoutAsDefault(layoutId),
    onSuccess: (_, layoutId) => {
      toast.success('Default layout updated');
      queryClient.invalidateQueries({ queryKey: ['layouts', activeEnvironmentId] });
      queryClient.invalidateQueries({ queryKey: ['layout', layoutId, activeEnvironmentId] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to set default layout';
      toast.error(message);
    },
  });

  return {
    layouts: layoutsQuery.data || [],
    isLoading: layoutsQuery.isLoading,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isSettingDefault: setDefaultMutation.isPending,
    createLayout: createMutation.mutateAsync,
    updateLayout: updateMutation.mutateAsync,
    deleteLayout: deleteMutation.mutateAsync,
    setDefaultLayout: setDefaultMutation.mutateAsync,
    error: layoutsQuery.error,
  };
};
