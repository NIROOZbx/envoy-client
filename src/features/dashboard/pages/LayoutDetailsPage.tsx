import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout as LayoutIcon, Clock, CheckCircle2, Star, Trash2, ChevronLeft } from 'lucide-react';
import { Spinner, AlertDialog } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { useLayout, useLayouts } from '../hooks/useLayouts';
import { LayoutForm } from '../components/layouts/LayoutForm';
import { LayoutMetadataCard } from '../components/layouts/LayoutMetadataCard';
import { IntegrationCard } from '../components/workflows/IntegrationCard';

export const LayoutDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { layout, isLoading, error } = useLayout(id ?? '');
  const { updateLayout, deleteLayout, setDefaultLayout, isUpdating, isDeleting, isSettingDefault } = useLayouts();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = async (data: { name: string; html: string }) => {
    try {
      await updateLayout({ layoutId: id!, data });
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="w-8 h-8 text-ui-muted opacity-20" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted animate-pulse">Synchronizing...</span>
        </div>
      </div>
    );
  }

  if (error || !layout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-ui-muted">
        <LayoutIcon className="w-16 h-16 mb-4 opacity-5" />
        <h2 className="text-xl font-black uppercase tracking-widest text-ui-text/20">Layout not found</h2>
        <Link 
          to="/dashboard/layouts"
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
            to="/dashboard/layouts"
            className="group flex flex-col items-center gap-1"
          >
            <div className="w-10 h-10 border border-ui-border rounded-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="text-[7px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-all">Back</span>
          </Link>
          
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-black tracking-tighter uppercase text-ui-text leading-none">{layout.name}</h1>
              {layout.is_default && (
                <div className="flex items-center gap-2 px-2.5 py-1 bg-black text-white rounded-md text-[9px] font-black uppercase tracking-widest shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-success" />
                  Primary Layout
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-ui-muted">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 opacity-30" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                  Last Sync {formatDate(layout.updated_at, 'p')}
                </span>
              </div>
              <div className="w-0.5 h-0.5 rounded-full bg-ui-border" />
              <div className="flex items-center gap-1.5">
                <LayoutIcon className="w-3.5 h-3.5 opacity-30" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-60">HTML/Handlebars</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!layout.is_default && (
            <button 
              onClick={() => setDefaultLayout(id!)}
              disabled={isSettingDefault}
              className="px-4 py-2.5 border border-ui-border rounded-md font-black text-[9px] uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all flex items-center gap-2 bg-ui-surface shadow-sm disabled:opacity-50"
            >
              {isSettingDefault ? <Spinner className="w-3 h-3" /> : <Star className="w-3 h-3" />}
              Set as Default
            </button>
          )}
          <button 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="w-10 h-10 border border-ui-border text-ui-muted hover:text-destructive hover:bg-destructive/5 hover:border-destructive/20 rounded-lg flex items-center justify-center transition-all bg-ui-surface shadow-sm"
            title="Delete Layout"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AlertDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={async () => {
          await deleteLayout(id!);
          navigate('/dashboard/layouts');
        }}
        isLoading={isDeleting}
        title="Destroy Layout"
        description="Permanently delete this layout? Workflows using it will revert to raw content."
        confirmLabel="Destroy"
        type="danger"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <div className="bg-ui-surface border border-ui-border rounded-lg overflow-hidden shadow-sm">
             <div className="px-6 py-4 border-b border-ui-border bg-ui-muted/5 flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-ui-muted">Layout Structure</h2>
            </div>
            <div className="p-8">
              <LayoutForm 
                initialData={{ name: layout.name, html: layout.html }}
                onSave={handleUpdate}
                isLoading={isUpdating}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <LayoutMetadataCard 
            label="Created" 
            value={formatDate(layout.created_at, 'MMM d, yyyy · p')} 
            icon={Clock}
          />
          <LayoutMetadataCard 
            label="Last Modified" 
            value={formatDate(layout.updated_at, 'MMM d, yyyy · p')} 
            icon={Clock}
          />
          
          <IntegrationCard
            bannerLabel="Pro Tip"
            title="Layout Tips"
            description="Preview your layout on desktop, tablet, and mobile simultaneously using the responsive preview mode to ensure pixel-perfect rendering at every breakpoint."
            buttonLabel="View Guidelines"
          />
        </div>
      </div>
    </div>
  );
};
