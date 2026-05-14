import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, type LucideIcon } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';

interface ResourceCardProps {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  typeLabel?: string;
  status?: {
    label: string;
    type: 'live' | 'draft' | 'default' | 'other';
  };
  updatedAt: string;
  actions?: React.ReactNode;
  iconClassName?: string;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  name,
  href,
  icon: Icon,
  typeLabel,
  status,
  updatedAt,
  actions,
  iconClassName,
  className
}) => {
  return (
    <div className={cn(
      "bg-ui-surface border border-ui-border rounded-lg p-5 hover:border-black transition-all group relative flex flex-col h-full shadow-sm",
      status?.type === 'default' && "ring-1 ring-black/5",
      className
    )}>
      <div className="flex items-start justify-between mb-5">
        <Link 
          to={href}
          className={cn(
            "w-10 h-10 rounded-md flex items-center justify-center transition-all shadow-sm",
            status?.type === 'default' ? "bg-black text-white" : "bg-ui-bg text-ui-text group-hover:bg-black group-hover:text-white",
            iconClassName
          )}
        >
          <Icon className="w-5 h-5" />
        </Link>
        
        <div className="flex gap-1 translate-x-2 -translate-y-2">
          {actions}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {status && (
            <>
              {status.type !== 'default' && (
                <div className={cn(
                  "w-1 h-1 rounded-full animate-pulse",
                  status.type === 'live' ? "bg-success" : "bg-ui-muted opacity-40"
                )} />
              )}
              <span className={cn(
                "text-[7px] font-black uppercase tracking-[0.2em]",
                status.type === 'default' ? "text-black bg-ui-bg px-1.5 py-0.5 rounded" : "text-ui-muted opacity-40"
              )}>
                {status.label}
              </span>
            </>
          )}
          {!status && typeLabel && (
             <span className="text-[7px] font-black uppercase tracking-[0.2em] text-ui-muted opacity-40">
               {typeLabel}
             </span>
          )}
        </div>
        <Link to={href} className="block group/title">
          <h3 className="font-black text-base tracking-tighter uppercase text-ui-text group-hover/title:text-black transition-colors mb-1">
            {name}
          </h3>
        </Link>
        {typeLabel && status && (
          <p className="text-[9px] text-ui-muted font-bold uppercase tracking-widest opacity-60 italic">
            {typeLabel}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-ui-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-ui-muted opacity-40">
          <Clock className="w-3 h-3" />
          <span className="text-[8px] font-black uppercase tracking-widest">
            {formatDate(updatedAt)}
          </span>
        </div>
        <Link 
          to={href}
          className="w-7 h-7 rounded-md border border-ui-border flex items-center justify-center text-ui-muted hover:bg-black hover:text-white hover:border-black transition-all"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
