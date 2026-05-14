import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, ToggleLeft, ToggleRight, CheckCircle2, Star, MoreHorizontal } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Dropdown, type DropdownOption } from '@/components/ui/Dropdown';
import { getProvider } from './providerConfig';
import type { ChannelConfigResponse } from '../../api/channelConfigs';

interface IntegrationRowProps {
  config: ChannelConfigResponse;
  onEdit: (config: ChannelConfigResponse) => void;
  onDelete: (config: ChannelConfigResponse) => void;
  onToggle: (config: ChannelConfigResponse) => void;
  onSetDefault: (config: ChannelConfigResponse) => void;
  isUpdating: boolean;
}

export const IntegrationRow: React.FC<IntegrationRowProps> = ({
  config,
  onEdit,
  onDelete,
  onToggle,
  onSetDefault,
  isUpdating,
}) => {
  const provider = getProvider(config.provider);
  const Icon = provider?.icon || Star;

  const actions: DropdownOption[] = [
    { 
      id: 'edit', 
      label: 'Edit Integration', 
      icon: Edit3, 
      onClick: () => onEdit(config) 
    },
    ...(!config.is_default ? [{ 
      id: 'set-default', 
      label: 'Set as Default', 
      icon: Star, 
      onClick: () => onSetDefault(config) 
    }] : []),
    { 
      id: 'delete', 
      label: 'Delete Integration', 
      icon: Trash2, 
      onClick: () => onDelete(config),
      variant: 'danger' as const
    }
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group bg-ui-surface border border-ui-border rounded-lg p-4 flex items-center justify-between hover:border-ui-text/20 transition-all shadow-sm"
    >
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className={cn(
          "w-12 h-12 rounded-md border flex items-center justify-center transition-all group-hover:scale-105 shadow-sm",
          provider?.color || "bg-ui-text text-ui-bg"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-0.5">
            <h3 className="font-black text-base tracking-tight uppercase text-ui-text truncate">
              {config.display_name}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                config.is_active ? "bg-success/5 text-success border-success/10" : "bg-ui-text/5 text-ui-muted/60 border-ui-border"
              )}>
                {config.is_active ? 'Active' : 'Inactive'}
              </span>
              {config.is_default && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-ui-text text-ui-bg rounded text-[8px] font-black uppercase tracking-widest">
                  <CheckCircle2 className="w-2.5 h-2.5 text-success" />
                  Default
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 text-[9px] font-black text-ui-muted uppercase tracking-widest opacity-50">
            <span>{config.channel}</span>
            <div className="w-0.5 h-0.5 bg-ui-border rounded-full" />
            <span>{provider?.name}</span>
            <div className="w-0.5 h-0.5 bg-ui-border rounded-full" />
            <span>{formatDate(config.updated_at)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button
          onClick={() => onToggle(config)}
          disabled={isUpdating}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-lg transition-all",
            config.is_active ? "text-success hover:bg-success/5" : "text-ui-muted opacity-30 hover:bg-ui-text/5"
          )}
        >
          {config.is_active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
        </button>

        <Dropdown 
          options={actions}
          align="right"
          trigger={
            <button className="p-2 hover:bg-ui-text/5 rounded-lg text-ui-muted/40 hover:text-ui-text transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          }
        />
      </div>
    </motion.div>
  );
};
