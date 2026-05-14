import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, ToggleLeft, ToggleRight, ChevronDown, ChevronRight, Clock, MoreHorizontal } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Dropdown, type DropdownOption } from '@/components/ui/Dropdown';
import { CHANNEL_OPTIONS } from './channelConfig';
import type { TemplateChannelResponse } from '../../api/templateChannels';
import { useBilling } from '../../hooks/useBilling';
import { AlertCircle, Zap } from 'lucide-react';

interface ChannelRowProps {
  channel: TemplateChannelResponse;
  onEdit: (ch: TemplateChannelResponse) => void;
  onDelete: (ch: TemplateChannelResponse) => void;
  onToggle: (ch: TemplateChannelResponse) => void;
  isUpdating: boolean;
}

export const ChannelRow: React.FC<ChannelRowProps> = ({ channel, onEdit, onDelete, onToggle, isUpdating }) => {
  const [expanded, setExpanded] = useState(false);
  const meta = CHANNEL_OPTIONS.find((o) => o.value === channel.channel);
  const Icon = meta?.icon;
  const { usage, plans, subscription } = useBilling();

  const currentPlan = plans.find(p => p.id === subscription?.ID || p.name === subscription?.PlanName);

  const getLimit = () => {
    if (!currentPlan) return 0;
    const n = channel.channel.toLowerCase();
    if (n.includes('email')) return currentPlan.email_limit;
    if (n.includes('sms')) return currentPlan.sms_limit;
    if (n.includes('push')) return currentPlan.push_limit;
    if (n.includes('slack')) return currentPlan.slack_limit;
    if (n.includes('whatsapp')) return currentPlan.whatsapp_limit;
    if (n.includes('webhook')) return currentPlan.webhook_limit;
    if (n.includes('in_app')) return currentPlan.in_app_limit;
    return 0;
  };

  const limit = getLimit();
  const currentUsage = usage?.usage.find(u => u.channel_name.toLowerCase().includes(channel.channel.toLowerCase()))?.current_usage || 0;
  const isSaturated = limit > 0 && currentUsage >= limit;

  const actions: DropdownOption[] = [
    {
      id: 'edit',
      label: 'Edit Channel',
      icon: Edit3,
      onClick: () => onEdit(channel)
    },
    {
      id: 'delete',
      label: 'Remove',
      icon: Trash2,
      onClick: () => onDelete(channel),
      variant: 'danger'
    }
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      className="bg-ui-surface border border-ui-border rounded-lg overflow-hidden shadow-sm hover:border-black/20 transition-all relative group"
    >
      <div className="flex items-center gap-4 px-4 py-3.5 w-full text-left">
        {Icon && (
          <div className={cn('w-9 h-9 rounded-md border flex items-center justify-center flex-shrink-0', meta?.color)}>
            <Icon className="w-4 h-4" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-black uppercase tracking-wide text-xs">{meta?.label ?? channel.channel}</span>
            <span className={cn(
              'px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest',
              channel.is_active ? 'bg-success/10 text-success border border-success/20' : 'bg-black/5 text-ui-muted/60 border border-ui-border',
            )}>
              {channel.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-[9px] font-medium text-ui-muted truncate flex items-center gap-2 opacity-60">
            {meta?.description}
            {channel.channel_config_id && <span className="font-mono">· {channel.channel_config_id}</span>}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(channel); }}
            disabled={isUpdating}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
              channel.is_active ? 'text-success hover:bg-success/10' : 'text-ui-muted/30 hover:bg-black/5',
            )}
          >
            {channel.is_active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
          </button>

          <Dropdown
            options={actions}
            align="right"
            trigger={
              <button className="p-2 hover:bg-black/5 rounded-lg text-ui-muted/40 hover:text-black transition-all">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            }
          />

          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-lg text-ui-muted transition-all hover:bg-black/5',
              expanded && 'bg-black text-white'
            )}
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-ui-border mx-4 mb-4 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-ui-muted">Content Preview</p>
                <div className="flex items-center gap-1 text-ui-muted/40">
                  <Clock className="w-2.5 h-2.5" />
                  <span className="text-[7px] font-black uppercase tracking-widest">
                    Updated {formatDate(channel.updated_at, 'MMM d, p')}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                {Object.entries(channel.content).map(([key, val]) => (
                  <div key={key} className="bg-black/[0.015] rounded-md px-3 py-2 border border-ui-border">
                    <div className="text-[8px] font-black uppercase tracking-widest text-ui-muted mb-0.5 opacity-40">{key.replace(/_/g, ' ')}</div>
                    <div className="text-[11px] font-medium text-ui-text/80 break-all leading-tight">
                      {typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val) || <span className="italic opacity-30">empty</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-ui-border">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="text-[8px] font-black uppercase tracking-widest text-ui-muted opacity-40">Saturation</div>
                    {isSaturated && (
                      <span className="flex items-center gap-1 text-[8px] font-black uppercase text-destructive">
                        <AlertCircle className="w-2.5 h-2.5" />
                        Limit Reached
                      </span>
                    )}
                  </div>
                  <div className="w-32 h-1 bg-black/5 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full transition-all duration-500", isSaturated ? "bg-destructive" : "bg-black")}
                      style={{ width: `${Math.min(100, (currentUsage / (limit || 1)) * 100)}%` }}
                    />
                  </div>
                </div>

                <button
                  disabled={isSaturated}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md font-black text-[9px] uppercase tracking-widest transition-all",
                    isSaturated
                      ? "bg-black/5 text-ui-muted cursor-not-allowed"
                      : "bg-black text-white hover:scale-[1.02] shadow-lg shadow-black/10"
                  )}
                  title={isSaturated ? "Notification limit reached for this channel" : "Send a test notification"}
                >
                  <Zap className="w-3 h-3" />
                  Send Test Notification
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
