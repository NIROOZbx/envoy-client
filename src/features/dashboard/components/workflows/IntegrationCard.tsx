import React from 'react';
import { ExternalLink } from 'lucide-react';

interface IntegrationCardProps {
  eventType?: string;
  updatedAt?: string;
  bannerLabel?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  eventType,
  bannerLabel = 'Integration',
  title = 'API Configuration',
  description = 'Trigger this workflow via API using the event name:',
  buttonLabel = 'View Documentation',
}) => {
  return (
    <div className="relative">
      <img
        src="/pin.png"
        alt=""
        className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 h-14 opacity-60"
      />
      <div className="bg-white rounded-[24px] overflow-hidden shadow-lg border border-black/5 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl relative group">
        <div className="relative overflow-hidden bg-linear-to-br from-[#fdfdfd] via-[#f5f5f5] to-[#e8e8e8] py-2.5 text-center border-b border-black/5">
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] text-ui-text opacity-70">
            {bannerLabel}
          </span>
        </div>

        <div className="p-3">
          <div className="border-2 border-dashed border-ui-border rounded-[18px] p-6 flex flex-col gap-4 bg-black/[0.02] relative">
            <div>
              <h3 className="text-lg font-black text-ui-text tracking-tight leading-tight uppercase">{title}</h3>
              <p className="text-[12px] font-medium leading-relaxed text-ui-muted opacity-80 mt-1">
                {description}
              </p>
            </div>

            {eventType && (
              <div className="inline-block font-mono font-bold text-success bg-success/10 px-3 py-2 rounded-md text-[13px] self-start shadow-sm border border-success/20">
                {eventType}
              </div>
            )}

            <button className="w-full mt-2 py-3.5 px-4 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-black/90 transition-all shadow-md group/btn">
              {buttonLabel}
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
