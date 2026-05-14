import React, { useState } from 'react';
import {  Send, MessageSquare, Activity,Users, Key } from 'lucide-react';
import { useBilling } from '../../hooks/useBilling';
import { PlanCard } from './PlanCard';
import {AlertDialog } from '@/components/ui';
import { UsageCard } from './UsageCard';
import { BillingSkeleton } from '@/components/ui';

export const BillingManager: React.FC = () => {
  const {
    plans,
    subscription,
    usage,
    isLoading,
    startCheckout,
    isStartingCheckout,
    startingPlanId,
    cancelSubscription,
    isCancelling
  } = useBilling();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleCancel = async (subscriptionID:string) => {
    try {
      await cancelSubscription(subscriptionID);
      setIsCancelModalOpen(false);
    } catch (err) { }
  };

  if (isLoading && !plans.length) {
    return <BillingSkeleton />;
  }

  if (!isLoading && !plans.length) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center text-ui-muted mb-6 mx-auto">
          <Activity className="w-8 h-8 opacity-20" />
        </div>
        <h2 className="text-xl font-black tracking-tighter uppercase mb-2">No Plans Available</h2>
        <p className="text-ui-muted font-medium text-sm max-w-xs mx-auto mb-8">
          We couldn't retrieve the billing plans. Please check your connection or try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
        >
          Retry Sync
        </button>
      </div>
    );
  }

  const currentPlan = plans.find(p => p.id === subscription?.ID || p.name === subscription?.PlanName);



  const isFree = subscription?.PlanName?.toLowerCase() === 'free';
  const emailUsage = usage?.usage.find(u => u.channel_name.toLowerCase().includes('email')) || { channel_name: 'Email', current_usage: 0 };
  const smsUsage = usage?.usage.find(u => u.channel_name.toLowerCase().includes('sms')) || { channel_name: 'SMS', current_usage: 0 };

  return (
    <div className="space-y-20 pb-20">
      {/* Usage Pulse Section */}
      <div>
        <div className="flex items-center gap-3 mb-8 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-black" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-ui-muted">Channel Saturation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email Usage */}
          <UsageCard 
            item={emailUsage} 
            limit={currentPlan?.email_limit || 0} 
            title="Email Consumption"
            icon={Send}
          />
          
          {/* SMS Usage */}
          <UsageCard 
            item={smsUsage} 
            limit={currentPlan?.sms_limit || 0} 
            title="SMS Consumption"
            icon={MessageSquare}
          />

          {/* API Keys Usage */}
          <UsageCard 
            item={{ channel_name: 'API Keys', current_usage: 2 }} // Mocking 2 keys
            limit={currentPlan?.api_keys_limit || 0} 
            title="API Key Saturation"
            icon={Key}
          />

          {/* Member Usage */}
          <UsageCard 
            item={{ channel_name: 'Members', current_usage: 1 }} // Mocking 1 member
            limit={currentPlan?.members_limit || 0} 
            title="Team Capacity"
            icon={Users}
          />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pt-10">
        <div className="text-center mb-16">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-4 leading-none text-ui-text">Infrastructure Plans</h2>
            <p className="text-ui-muted font-bold tracking-tight opacity-40 text-sm">Select the optimal saturation for your notification flow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrent={subscription?.ID === plan.id || subscription?.PlanName === plan.name}
              onSelect={(p) => {
                startCheckout(p.id);
              }}
              isLoading={isStartingCheckout && startingPlanId === plan.id}
            />
          ))}
        </div>
      </div>

      {/* Cancel Subscription Area */}
      {!isFree && subscription && !subscription.CancelAtPeriodEnd && (
        <div className="flex justify-center pt-16 border-t border-ui-border">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="bg-destructive text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-[0.98] transition-all shadow-xl shadow-destructive/20"
          >
            Cancel Subscription
          </button>
        </div>
      )}

      <AlertDialog
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => subscription && handleCancel(subscription.ID)}
        isLoading={isCancelling}
        title="Cancel Subscription"
        description="Are you sure you want to cancel? You will lose access to premium features at the end of your billing cycle."
        confirmLabel="Confirm"
        type="danger"
      />
    </div>
  );
};
