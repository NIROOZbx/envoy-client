import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '../../../store/authStore';
import {
  listPlans,
  createCheckoutSession,
  getSubscription,
  getUsage,
  cancelSubscription,
  type SubscriptionInfo,
  type UsageInfo,
} from '../api/billing';

export const useBilling = () => {
  const queryClient = useQueryClient();
  const activeEnvironmentId = useAuthStore((state) => state.activeEnvironmentId);

  const {
    data: plans = [],
    isLoading: isLoadingPlans,
    error: plansError,
  } = useQuery({
    queryKey: ['billingPlans'],
    queryFn: listPlans,
  });

  const {
    data: subscription,
    isLoading: isLoadingSubscription,
  } = useQuery<SubscriptionInfo>({
    queryKey: ['subscription', activeEnvironmentId],
    queryFn: getSubscription,
    enabled: !!activeEnvironmentId,
  });

  const {
    data: usage,
    isLoading: isLoadingUsage,
  } = useQuery<UsageInfo>({
    queryKey: ['usage', activeEnvironmentId],
    queryFn: getUsage,
    enabled: !!activeEnvironmentId,
  });

  const checkoutMutation = useMutation({
    mutationFn: (planID: string) => createCheckoutSession(planID),
    onSuccess: (checkoutUrl) => {
      if (checkoutUrl && typeof checkoutUrl === 'string') {
        window.location.href = checkoutUrl;
      } else {
        toast.error('Invalid checkout response from server');
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to initiate checkout');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (subscriptionID: string) => cancelSubscription(subscriptionID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription', activeEnvironmentId] });
      toast.success('Subscription cancelled successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to cancel subscription');
    },
  });

  return {
    plans,
    subscription,
    usage,
    isLoading: isLoadingPlans || isLoadingSubscription || isLoadingUsage,
    isStartingCheckout: checkoutMutation.isPending,
    startingPlanId: checkoutMutation.variables,
    isCancelling: cancelMutation.isPending,
    plansError,
    startCheckout: checkoutMutation.mutate,
    cancelSubscription: cancelMutation.mutateAsync,
  };
};
