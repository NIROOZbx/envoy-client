import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../store/authStore';
import { 
  createTemplate, 
  getTemplates, 
  deleteTemplate, 
  getTemplateById, 
  updateTemplate 
} from '../api/templates';
import type { CreateTemplateRequest, UpdateTemplateRequest } from '../api/templates';
import { toast } from 'sonner';

export const useTemplate = (templateId: string) => {
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);

  const templateQuery = useQuery({
    queryKey: ['template', templateId, activeEnvironmentId],
    queryFn: () => getTemplateById(templateId),
    enabled: !!templateId && !!activeEnvironmentId,
  });

  return {
    template: templateQuery.data,
    isLoading: templateQuery.isLoading,
    error: templateQuery.error,
  };
};

export const useTemplates = () => {
  const queryClient = useQueryClient();
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);

  const templatesQuery = useQuery({
    queryKey: ['templates', activeEnvironmentId],
    queryFn: getTemplates,
    enabled: !!activeEnvironmentId,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTemplateRequest) => createTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates', activeEnvironmentId] });
      toast.success('Template created successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create template');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTemplateRequest }) => 
      updateTemplate(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['templates', activeEnvironmentId] });
      queryClient.invalidateQueries({ queryKey: ['template', variables.id, activeEnvironmentId] });
      toast.success('Template updated');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update template');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates', activeEnvironmentId] });
      toast.success('Template deleted');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete template');
    },
  });

  return {
    templates: templatesQuery.data || [],
    isLoading: templatesQuery.isLoading,
    error: templatesQuery.error,
    createTemplate: createMutation.mutateAsync,
    updateTemplate: updateMutation.mutateAsync,
    deleteTemplate: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
