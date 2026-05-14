import React from 'react';
import { AlertCircle, ShieldAlert, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBilling } from '../hooks/useBilling';
import { Link } from 'react-router-dom';

export const UsageBanner: React.FC = () => {
  const { usage, plans, subscription, isLoading } = useBilling();
  const [isVisible, setIsVisible] = React.useState(true);

  if (isLoading || !usage || !plans.length || !subscription || !isVisible) return null;

  const currentPlan = plans.find(p => p.id === subscription.ID || p.name === subscription.PlanName);
  if (!currentPlan) return null;

  const channels = [
    { name: 'Email', usage: usage.usage.find(u => u.channel_name.toLowerCase().includes('email'))?.current_usage || 0, limit: currentPlan.email_limit },
    { name: 'SMS', usage: usage.usage.find(u => u.channel_name.toLowerCase().includes('sms'))?.current_usage || 0, limit: currentPlan.sms_limit },
    { name: 'Push', usage: usage.usage.find(u => u.channel_name.toLowerCase().includes('push'))?.current_usage || 0, limit: currentPlan.push_limit },
    { name: 'Slack', usage: usage.usage.find(u => u.channel_name.toLowerCase().includes('slack'))?.current_usage || 0, limit: currentPlan.slack_limit },
    { name: 'WhatsApp', usage: usage.usage.find(u => u.channel_name.toLowerCase().includes('whatsapp'))?.current_usage || 0, limit: currentPlan.whatsapp_limit },
    { name: 'Webhook', usage: usage.usage.find(u => u.channel_name.toLowerCase().includes('webhook'))?.current_usage || 0, limit: currentPlan.webhook_limit },
    { name: 'In-App', usage: usage.usage.find(u => u.channel_name.toLowerCase().includes('in_app'))?.current_usage || 0, limit: currentPlan.in_app_limit },
  ];

  // Find the most critical channel
  const criticalChannel = [...channels]
    .filter(c => c.limit > 0)
    .sort((a, b) => (b.usage / b.limit) - (a.usage / a.limit))[0];

  if (!criticalChannel) return null;

  const percentage = (criticalChannel.usage / criticalChannel.limit) * 100;

  if (percentage < 80) return null;

  const isBlocking = percentage >= 100;

  return (
    <div className={cn(
      "relative w-full border-b transition-all duration-500 animate-in slide-in-from-top",
      isBlocking
        ? "bg-destructive/5 border-destructive/20 text-destructive"
        : "bg-warning/5 border-warning/20 text-warning"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center gap-3">
          {isBlocking ? (
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest leading-tight">
              {isBlocking
                ? `Your ${criticalChannel.name} limit reached. Blocked.`
                : `Using ${Math.floor(percentage)}% of ${criticalChannel.name} limit.`
              }
            </p>
            <Link
              to="/dashboard/billing"
              className="inline-flex items-center gap-1 text-[10px] font-black underline underline-offset-4 decoration-current/30 hover:decoration-current transition-all"
            >
              Upgrade Now
              <ArrowUpRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 sm:static p-1 hover:bg-current/10 rounded-md transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
