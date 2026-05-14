import React from 'react';
import { useSubscriberPreferences } from '../../hooks/useSubscribers';
import { Loader2, Settings2, Bell, BellOff, Zap } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { ACTIVE_CHANNELS } from '../../constants/channels';
import { Skeleton } from '@/components/ui';
import { Clock } from 'lucide-react';

interface Props {
  externalUserId: string;
}

export const SubscriberPreferences: React.FC<Props> = ({ externalUserId }) => {
  const { preferences, isLoading } = useSubscriberPreferences(externalUserId);

  if (isLoading) {
    return (
      <div className="p-10 bg-black/[0.02] border-t border-ui-border">
        <div className="flex items-center gap-4 mb-10">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-12">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-4 w-32 border-b border-ui-border pb-4" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-black/[0.02] border-t border-ui-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white border border-ui-border rounded-xl flex items-center justify-center shadow-sm">
            <Settings2 className="w-5 h-5 text-ui-text" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-ui-text mb-1">Infrastructure Signal Audit</h4>
            <p className="text-[10px] font-bold text-ui-muted-dark">Current preference state for Email and SMS delivery pulses.</p>
          </div>
        </div>
      </div>

      {/* Global Channel State */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        {ACTIVE_CHANNELS.map((ch) => {
          const pref = preferences.find(p => p.channel === ch.id && !p.event_type);
          const isEnabled = pref ? pref.is_enabled : true;

          return (
            <div
              key={ch.id}
              className={cn(
                "group relative p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden",
                isEnabled 
                  ? "bg-white border-ui-border shadow-sm" 
                  : "bg-black/[0.02] border-dashed border-ui-border/50 opacity-60 grayscale"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors",
                isEnabled ? "bg-black text-white" : "bg-ui-border text-ui-muted"
              )}>
                <ch.icon className="w-5 h-5" />
              </div>
              
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest">{ch.label}</span>
                {isEnabled ? (
                  <Bell className="w-3 h-3 text-emerald-500" />
                ) : (
                  <BellOff className="w-3 h-3 text-ui-muted" />
                )}
              </div>
              
              <div className="text-[9px] font-bold text-ui-muted uppercase tracking-widest">
                {isEnabled ? 'Global Active' : 'Global Muted'}
              </div>

              {pref && (
                <div className="mt-4 pt-4 border-t border-ui-border/50 flex items-center gap-1.5 text-ui-muted">
                  <Clock className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    Last Sync: {formatDate(pref.updated_at, 'MMM d, p')}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Event Overrides Audit */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-ui-border pb-4">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted">Event Specific Logic</h5>
        </div>

        {/* List of Overrides */}
        <div className="grid grid-cols-2 gap-4">
          {preferences.filter(p => p.event_type !== '').map((pref, i) => {
            const ch = ACTIVE_CHANNELS.find(c => c.id === pref.channel);
            if (!ch) return null;
            
            return (
              <div 
                key={`${pref.channel}-${pref.event_type}-${i}`}
                className="bg-white border border-ui-border rounded-2xl p-4 flex items-center justify-between group transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-black/5 rounded-lg flex items-center justify-center text-ui-muted group-hover:bg-black group-hover:text-white transition-all">
                    <ch.icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-ui-text">{pref.event_type}</span>
                      <span className="text-[8px] font-bold text-ui-muted-subtle uppercase">{pref.channel}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn("text-[9px] font-black uppercase tracking-widest", pref.is_enabled ? "text-emerald-500" : "text-ui-muted")}>
                        {pref.is_enabled ? 'Override: Active' : 'Override: Muted'}
                      </span>
                      <div className="flex items-center gap-1 text-ui-muted-subtle">
                        <Clock className="w-2.5 h-2.5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{formatDate(pref.updated_at, 'MMM d, p')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {preferences.filter(p => p.event_type !== '').length === 0 && (
          <div className="py-12 border-2 border-dashed border-ui-border rounded-2xl flex flex-col items-center justify-center text-center">
            <Zap className="w-8 h-8 text-ui-muted opacity-10 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-40">No specific trigger logic detected for this recipient</p>
          </div>
        )}
      </div>
    </div>
  );
};
