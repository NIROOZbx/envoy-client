import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Send, Clock, Trash2, ChevronLeft, Layout as LayoutIcon, Zap } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import {  AlertDialog, Dropdown } from '@/components/ui';
import { useTemplate, useTemplates } from '../hooks/useTemplates';
import { useLayouts } from '../hooks/useLayouts';

// Modular Components
import { WorkflowForm } from '../components/workflows/WorkflowForm';
import { LayoutMetadataCard } from '../components/layouts/LayoutMetadataCard';
import { TemplateChannelsPanel } from '../components/workflows/TemplateChannelsPanel';
import { WorkflowDetailsSkeleton } from '../components/workflows/WorkflowSkeleton';
import { IntegrationCard } from '../components/workflows/IntegrationCard';


export const WorkflowDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { template, isLoading, error } = useTemplate(id ?? '');
  const { updateTemplate, deleteTemplate, isUpdating, isDeleting } = useTemplates();
  const { layouts } = useLayouts();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = async (data: any) => {
    try {
      await updateTemplate({ id: id!, data });
    } catch (err) {}
  };

  const handleStatusChange = async (status: 'draft' | 'live' | 'dropped') => {
    try {
      await updateTemplate({ id: id!, data: { status } });
    } catch (err) {}
  };

  if (isLoading) {
    return <WorkflowDetailsSkeleton />;
  }

  if (error || !template) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-ui-muted">
        <Send className="w-16 h-16 mb-4 opacity-5" />
        <h2 className="text-xl font-black uppercase tracking-widest text-ui-text/20">Workflow not found</h2>
        <Link 
          to="/dashboard/templates"
          className="mt-6 px-6 py-3 bg-black text-white rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-24">
      {/* Header Bar */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link 
            to="/dashboard/templates"
            className="group flex flex-col items-center gap-1"
          >
            <div className="w-10 h-10 border border-ui-border rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="text-[7px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-all">Back</span>
          </Link>
          
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-black tracking-tighter uppercase text-ui-text leading-none">{template.name}</h1>
              <div className={cn(
                "flex items-center gap-2 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest shadow-sm transition-all",
                template.status === 'live' ? "bg-success text-white" : "bg-black text-white"
              )}>
                {template.status === 'live' ? <Zap className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {template.status}
              </div>
            </div>
            <div className="flex items-center gap-4 text-ui-muted">
              <div className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 opacity-30" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                  Trigger: <span className="text-ui-text">{template.event_type}</span>
                </span>
              </div>
              <div className="w-0.5 h-0.5 rounded-full bg-ui-border" />
              <div className="flex items-center gap-1.5">
                <LayoutIcon className="w-3.5 h-3.5 opacity-30" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                  Layout: <span className="text-ui-text">{layouts.find(l => l.id === template.layout_id)?.name || 'Raw Content'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Dropdown 
            value={template.status}
            onChange={(val) => handleStatusChange(val as any)}
            options={[
              { id: 'draft', label: 'Draft', icon: Clock },
              { id: 'live', label: 'Live', icon: Zap },
              { id: 'dropped', label: 'Dropped', icon: Trash2 }
            ]}
            className="w-32"
          />
          
          <button 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="w-10 h-10 border border-ui-border text-ui-muted hover:text-destructive hover:bg-destructive/5 hover:border-destructive/20 rounded-lg flex items-center justify-center transition-all bg-ui-surface shadow-sm"
            title="Delete Workflow"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AlertDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={async () => {
          await deleteTemplate(id!);
          navigate('/dashboard/templates');
        }}
        isLoading={isDeleting}
        title="Destroy Workflow"
        description="Permanently delete this notification logic? This cannot be undone."
        confirmLabel="Destroy"
        type="danger"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <div className="bg-ui-surface border border-ui-border rounded-lg overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-ui-border bg-ui-muted/5 flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-ui-muted">Workflow Configuration</h2>
            </div>
            <div className="p-8">
              <WorkflowForm 
                initialData={{ 
                  name: template.name, 
                  description: template.description,
                  event_type: template.event_type,
                  layout_id: template.layout_id ?? undefined,
                  status: template.status as any
                }}
                onSave={handleUpdate}
                isLoading={isUpdating}
                mode="edit"
                layouts={layouts}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <LayoutMetadataCard 
            label="Created" 
            value={formatDate(template.created_at, 'MMM d, yyyy · p')} 
            icon={Clock}
          />
          <LayoutMetadataCard 
            label="Last Sync" 
            value={formatDate(template.updated_at, 'MMM d, yyyy · p')} 
            icon={Clock}
          />
          
          <IntegrationCard 
            eventType={template.event_type}
            updatedAt={template.updated_at}
          />

        </div>
      </div>

      {/* ── Delivery Channels Panel ───────────────────────────────────── */}
      <div className="mt-8">
        <TemplateChannelsPanel
          templateId={id!}
        />
      </div>
    </div>
  );
};
