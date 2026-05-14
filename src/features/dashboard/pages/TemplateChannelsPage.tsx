import React from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { ChevronLeft, Layers, Send } from 'lucide-react';
import { TemplateChannelsPanel } from '../components/workflows/TemplateChannelsPanel';
import { useTemplate } from '../hooks/useTemplates';
import { IntegrationSkeleton } from '@/components/ui';

export const TemplateChannelsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { environmentId } = useOutletContext<{ environmentId: string | null }>();

  const { template, isLoading, error } = useTemplate(id ?? '');

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto pb-24">
        <IntegrationSkeleton />
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-ui-muted">
        <Send className="w-20 h-20 mb-6 opacity-5 animate-in zoom-in-95 duration-700" />
        <h2 className="text-2xl font-black uppercase tracking-widest text-ui-text/20">Workflow not found</h2>
        <Link 
          to="/dashboard/templates"
          className="mt-8 px-6 py-3 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-black/10"
        >
          <ChevronLeft className="w-4 h-4" />
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="mb-12 flex items-center gap-8">
        <Link 
          to={`/dashboard/templates/${id}`}
          className="group flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 border border-ui-border rounded-2xl flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all shadow-sm shadow-black/5">
            <ChevronLeft className="w-6 h-6" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-all">Back</span>
        </Link>
        
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Layers className="w-5 h-5 text-ui-muted opacity-50" />
            <h1 className="text-4xl font-black tracking-tighter uppercase text-ui-text">
              Delivery Channels
            </h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-ui-muted">
            Managing channels for <span className="text-ui-text">{template.name}</span>
          </p>
        </div>
      </div>

      <TemplateChannelsPanel 
        templateId={id ?? ''}
      />
    </div>
  );
};
