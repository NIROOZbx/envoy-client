import React from 'react';
import { Key, Trash2, ShieldX, Clock, Zap, History } from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';
import type { APIKeyInfo } from '../../api/apiKeys';

interface ApiKeyRowProps {
  apiKey: APIKeyInfo;
  onDelete: (key: APIKeyInfo) => void;
  onRevoke: (key: APIKeyInfo) => void;
  isRevoking: boolean;
  isDeleting: boolean;
}

export const ApiKeyRow: React.FC<ApiKeyRowProps> = ({
  apiKey,
  onDelete,
  onRevoke,
  isRevoking,
  isDeleting,
}) => {
  const isExpired = apiKey.expires_at && new Date(apiKey.expires_at) < new Date();
  const isDisabled = apiKey.is_revoked || isExpired;

  return (
    <div className={cn(
      "group bg-ui-surface border border-ui-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-black/20 relative overflow-hidden",
      isDisabled && "opacity-60 grayscale-[0.5]"
    )}>
      {/* Background Decor */}
      <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        <Key className="w-24 h-24 rotate-12" />
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-md flex items-center justify-center transition-all shadow-sm",
          apiKey.is_revoked ? "bg-black/5 text-ui-muted" : 
          isExpired ? "bg-amber-100 text-amber-600 shadow-amber-200/10" : 
          "bg-black text-white shadow-black/5"
        )}>
          <Key className="w-5 h-5" />
        </div>
        
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-base uppercase tracking-tighter text-ui-text">{apiKey.label}</h3>
            {apiKey.is_revoked ? (
              <span className="px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest bg-black/5 text-ui-muted border border-ui-border">Revoked</span>
            ) : isExpired ? (
              <span className="px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 border border-amber-200">Expired</span>
            ) : (
              <span className="px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 border border-emerald-200">Active</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-[9px] font-black text-ui-muted uppercase tracking-widest opacity-50">
            <span className="flex items-center gap-1"><ShieldX className="w-2.5 h-2.5" /> {apiKey.key_hint}••••</span>
            <span className="w-1 h-1 rounded-full bg-ui-border" />
            <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {formatDate(apiKey.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-8 relative z-10">
        {/* Metadata */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-ui-muted opacity-40 flex items-center gap-1">
              <History className="w-2 h-2" /> Last Used
            </span>
            <span className="text-[9px] font-black text-ui-text">
              {apiKey.last_used_at ? formatDate(apiKey.last_used_at) : 'Never'}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-ui-muted opacity-40 flex items-center gap-1">
              <Zap className="w-2 h-2" /> Expires
            </span>
            <span className={cn(
              "text-[9px] font-black",
              isExpired ? "text-destructive" : "text-ui-text"
            )}>
              {apiKey.expires_at ? formatDate(apiKey.expires_at) : 'Never'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {!apiKey.is_revoked && !isExpired && (
            <button
              onClick={() => onRevoke(apiKey)}
              disabled={isRevoking}
              className="p-2.5 text-ui-muted hover:text-black hover:bg-black/5 rounded-lg transition-all group/btn"
              title="Revoke Key"
            >
              <ShieldX className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </button>
          )}
          <button
            onClick={() => onDelete(apiKey)}
            disabled={isDeleting}
            className="p-2.5 text-ui-muted hover:text-destructive hover:bg-destructive/5 rounded-lg transition-all group/btn"
            title="Delete Permanently"
          >
            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
