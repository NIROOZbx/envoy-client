import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutMetadataCardProps {
  label: string;
  value: string;
  icon?: any;
}

export const LayoutMetadataCard: React.FC<LayoutMetadataCardProps> = ({ label, value, icon: Icon }) => (
  <div className="bg-ui-surface border border-ui-border rounded-2xl p-6 shadow-sm shadow-black/5">
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon className="w-3.5 h-3.5 text-ui-muted opacity-40" />}
      <div className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-50">{label}</div>
    </div>
    <div className={cn(
      "font-bold text-ui-text",
      label === 'ID' ? "text-[10px] font-mono break-all opacity-80" : "text-sm"
    )}>
      {value}
    </div>
  </div>
);
