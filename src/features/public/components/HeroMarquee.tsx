import React from 'react';
import { PipelineMarquee } from '../../../components/ui/Marquee';

export const HeroMarquee: React.FC = () => {
  return (
    <section className="relative py-12 px-6 overflow-hidden bg-pearl">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="w-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-ui-border" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted">
              Enterprise Grade Reliability
            </span>
            <div className="h-px flex-1 bg-ui-border" />
          </div>
          <PipelineMarquee />
        </div>
      </div>
    </section>
  );
};
