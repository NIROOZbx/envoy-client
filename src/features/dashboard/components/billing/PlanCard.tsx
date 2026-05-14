import React from 'react';
import { Check, Zap, Star, ShieldCheck, Users, Key, Database, Send, MessageSquare, Bell, Hash, MessageCircle, Globe, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BillingPlan } from '../../api/billing';
import { Spinner } from '@/components/ui';

interface PlanCardProps {
  plan: BillingPlan;
  isCurrent?: boolean;
  onSelect: (plan: BillingPlan) => void;
  isLoading?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isCurrent,
  onSelect,
  isLoading,
}) => {
  const isFree = plan.price_cents === 0;
  const isPopular = plan.name.toLowerCase() === 'pro';
  const isEnterprise = plan.name.toLowerCase() === 'enterprise';

  const priceDisplay = plan.price_cents.toString();
  
  const originalPrice = plan.original_price && plan.original_price > plan.price_cents
    ? plan.original_price.toString() 
    : null;

  const formatLimit = (limit: number) => {
      if (limit === -1) return 'Unlimited';
      if (limit >= 1000) return `${(limit / 1000).toFixed(0)}k`;
      return limit.toString();
  };

  const channelLimits = [
      { label: 'Email', limit: plan.email_limit, icon: Send },
      { label: 'SMS', limit: plan.sms_limit, icon: MessageSquare },
      { label: 'Push', limit: plan.push_limit, icon: Bell },
      { label: 'Slack', limit: plan.slack_limit, icon: Hash },
      { label: 'WhatsApp', limit: plan.whatsapp_limit, icon: MessageCircle },
      { label: 'Webhooks', limit: plan.webhook_limit, icon: Globe },
      { label: 'In-App', limit: plan.in_app_limit, icon: Layout },
  ];

  return (
    <div className={cn(
      "relative bg-white border border-ui-border rounded-[24px] flex flex-col transition-all duration-500 shadow-sm overflow-hidden",
      isPopular && "ring-2 ring-black ring-offset-0",
      isCurrent && "border-black"
    )}>
      {/* Top Section - Colored Background */}
      <div className={cn(
        "p-6 pb-8 m-1.5 rounded-[20px] transition-colors",
        isPopular ? "bg-[#EEF2FF]" : "bg-[#F8F9FA]"
      )}>
        {/* Badge */}
        <div className="h-7 mb-6">
            {(isPopular || isEnterprise) && (
                <div className="inline-flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm border border-black/5 rounded-full shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-ui-text">
                        {plan.name}
                    </span>
                </div>
            )}
        </div>

        {/* Pricing */}
        <div className="mb-6">
            <div className="flex items-baseline gap-2">
                {originalPrice && (
                    <span className="text-lg font-bold text-ui-muted line-through opacity-30 decoration-black decoration-2">
                        ${originalPrice}
                    </span>
                )}
                <span className="text-4xl font-black tracking-tighter text-ui-text">${priceDisplay}</span>
                <span className="text-sm font-bold text-ui-muted tracking-tight opacity-40">/month</span>
            </div>
        </div>

        {/* Tagline */}
        <div className="mb-8">
            <p className="text-[13px] font-bold text-ui-text tracking-tight">
                {isFree ? 'Perfect For Small Teams' : isPopular ? 'Perfect For Growing Teams' : 'For Large Organizations'}
            </p>
        </div>

        {/* Action Button inside top section */}
        <button
            onClick={() => onSelect(plan)}
            disabled={isCurrent || isLoading}
            className={cn(
            "w-full py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm",
            isCurrent 
                ? "bg-black/5 text-ui-muted cursor-default" 
                : "bg-black text-white hover:shadow-lg hover:shadow-black/10"
            )}
        >
            {isLoading && <Spinner className="w-3.5 h-3.5" />}
            {isCurrent ? 'Current Plan' : isLoading ? 'Processing' : 'Select Plan'}
        </button>
      </div>

      {/* Bottom Section - Features (White Background) */}
      <div className="p-8 pt-6 space-y-6 flex-1">
        <div className="space-y-3.5">
            <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-black/20 shrink-0" />
                <span className="text-[13px] font-bold text-ui-text opacity-80">{plan.members_limit} Team Members</span>
            </div>
            <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-black/20 shrink-0" />
                <span className="text-[13px] font-bold text-ui-text opacity-80">{plan.api_keys_limit} API Keys</span>
            </div>
            <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-black/20 shrink-0" />
                <span className="text-[13px] font-bold text-ui-text opacity-80">{plan.log_retention_days} Days Retention</span>
            </div>
        </div>

        <div className="space-y-3.5 pt-4 border-t border-ui-border">
            {channelLimits.filter(c => c.limit !== 0).map((c, i) => (
                <div key={i} className="flex items-center gap-3 group/item">
                    <Check className="w-4 h-4 text-black/10 group-hover/item:text-black/40 transition-colors shrink-0" />
                    <div className="flex justify-between items-center w-full">
                        <span className="text-[13px] font-bold text-ui-text opacity-60">{c.label} Notifications</span>
                        <span className="text-[11px] font-black text-ui-text tracking-tighter opacity-40">
                            {formatLimit(c.limit)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
