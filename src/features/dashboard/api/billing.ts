import { apiClient } from '../../../lib/api-client';

const api = apiClient;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: number | string;
}

export interface BillingPlan {
  id: string;
  name: string;
  members_limit: number;
  api_keys_limit: number;
  log_retention_days: number;
  price_cents: number;
  original_price: number;
  external_price_id: string;
  email_limit: number;
  sms_limit: number;
  push_limit: number;
  slack_limit: number;
  whatsapp_limit: number;
  webhook_limit: number;
  in_app_limit: number;
}

export type CheckoutSessionResponse = string;

export interface CheckoutSessionDetails {
  id: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  subscription_id?: string;
  plan_name?: string;
}

export interface SubscriptionInfo {
  ID: string;
  PlanName: string;
  Status: string;
  CurrentPeriodEnd: string;
  CancelAtPeriodEnd: boolean;
}

export interface ChannelUsage {
  channel_name: string;
  current_usage: number;
}

export interface UsageInfo {
  workspace_id: string;
  environment_id: string;
  usage: ChannelUsage[];
  period_start?: string;
  period_end?: string;
  PeriodStart?: string;
  PeriodEnd?: string;
  subscription_status: string;
}

// ─── API Methods ──────────────────────────────────────────────────────────────

export const listPlans = async (): Promise<BillingPlan[]> => {
  const response = await api.get('/plans');
  return response.data.data || [];
};

export const createCheckoutSession = async (planID: string): Promise<CheckoutSessionResponse> => {
  const response = await api.post('/workspaces/current/checkout', null, {
    params: { plan_id: planID }
  });
  return response.data.data;
};

export const getCheckoutSession = async (sessionId: string): Promise<CheckoutSessionDetails> => {
  const response = await api.get('/workspaces/current/checkout/session', {
    params: { session_id: sessionId }
  });
  return response.data.data;
};

export const getSubscription = async (): Promise<SubscriptionInfo> => {
  const response = await api.get('/workspaces/current/subscription');
  return response.data.data;
};

export const getUsage = async (): Promise<UsageInfo> => {
  const response = await api.get('/workspaces/current/usage');
  return response.data.data;
};

export const cancelSubscription = async (subscriptionID:string): Promise<void> => {
  await api.delete('/workspaces/current/subscription',{
    params:{id:subscriptionID}
  });
};
