import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { BillingManager } from '../components/billing/BillingManager';
import { useBilling } from '../hooks/useBilling';
import { formatDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { environmentId } = useOutletContext<{ environmentId: string | null }>();
  const { subscription, usage } = useBilling();

  if (!environmentId) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-ui-muted">
        <p className="font-black text-[10px] uppercase tracking-[0.3em] opacity-40">Environment required for billing</p>
      </div>
    );
  }

  // Handle both field cases
  const periodStart = usage?.PeriodStart || usage?.period_start;
  const periodEnd = usage?.PeriodEnd || usage?.period_end || subscription?.CurrentPeriodEnd;

  return (
    <div className="max-w-7xl mx-auto pb-32">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
        <div className="flex items-end gap-6">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-ui-text leading-[0.8]">Billing</h1>
          
          <div className="flex flex-col gap-2 pb-1.5 translate-y-1">
            {subscription && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-ui-text">
                  {subscription.PlanName} Plan
                </span>
              </div>
            )}
            
            {(periodStart || periodEnd) && (
              <div className="flex items-center gap-2 bg-black/[0.03] border border-ui-border rounded-md px-2 py-1">
                <Calendar className="w-3 h-3 text-ui-muted" />
                <span className="text-[9px] font-black uppercase tracking-widest text-ui-text opacity-70">
                  {periodStart ? formatDate(periodStart) : '...'} — {periodEnd ? formatDate(periodEnd) : '...'}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-ui-muted font-bold tracking-tight opacity-60 text-xs max-w-sm lg:text-right pb-1.5">
          Manage your workspace subscription and usage limits.
        </p>
      </div>

      <BillingManager />
    </div>
  );
};
