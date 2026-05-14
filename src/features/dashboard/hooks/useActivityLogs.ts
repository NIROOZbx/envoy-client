import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/authStore';

export interface ActivityLog {
    id: string;
    channel: string;
    delivery_status: string;
    recipient: string;
    provider: string;
    provider_message_id: string;
    provider_response: string;
    error_message: string;
    template_id: string;
    template_name: string;
    external_user_id: string;
    trigger_data: any;
    duration_ms: number;
    attempt_count: number;
    created_at: string;
    sent_at?: string;
    delivered_at?: string;
    failed_at?: string;
}

export interface ActivityLogsResponse {
    logs: ActivityLog[];
    total_count: number;
    total_pages: number;
    current_page: number;
    page_size: number;
}

export interface ActivityLogsParams {
    page?: number;
    page_size?: number;
    channel?: string;
    status?: string;
    provider?: string;
}

export const useActivityLogs = (params: ActivityLogsParams) => {
    const environmentId = useAuthStore(state => state.activeEnvironmentId);

    return useQuery({
        queryKey: ['activity-logs', params, environmentId],
        queryFn: async () => {
            const { data } = await apiClient.get<any>('/workspaces/current/analytics/logs', {
                params: {
                    page: params.page || 1,
                    page_size: params.page_size || 20,
                    channel: params.channel === 'all' ? undefined : params.channel,
                    status: params.status === 'all' ? undefined : params.status,
                    provider: params.provider || undefined,
                },
            });
            return data.data as ActivityLogsResponse;
        },
        placeholderData: keepPreviousData,
    });
};
