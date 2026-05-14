import { apiClient } from '../../../lib/api-client';

const api = apiClient;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProviderCount {
  name: string;
  count: number;
}

export interface TimeSeriesDataDto {
  label: string;
  sent_count: number;
  delivered_count: number;
  failed_count: number;
}

export interface ProviderHealth {
  provider: string;
  avg_latency: number;
  last_sync: string;
}

export interface AnalyticsResponse {
  aggregate: {
    total_sent: number;
    total_delivered: number;
    total_failed: number;
    total_bounced: number;
    most_used_channel: string;
    most_used_provider: string;
    most_recent_provider: string;
    trends: Record<string, number>;
  };
  channels: Record<string, number>;
  providers: ProviderCount[];
  time_series: TimeSeriesDataDto[];
  health: {
    average_latency_ms: number;
    latency_trend: number[];
    active_providers: ProviderHealth[];
  };
}

export interface AnalyticsParams {
  start?: string;
  end?: string;
  group_by?: string;
}

// ─── API Methods ──────────────────────────────────────────────────────────────

export const getAnalytics = async (params: AnalyticsParams): Promise<AnalyticsResponse> => {
  const response = await api.get('/workspaces/current/analytics', {
    params,
  });
  return response.data.data;
};
