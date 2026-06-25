import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Search, Send, Trash2, MoreHorizontal } from 'lucide-react';
import {formatDate } from '@/lib/utils';
import { Modal, AlertDialog, Dropdown, type DropdownOption } from '@/components/ui';
import { useTemplates } from '../hooks/useTemplates';
import { useLayouts } from '../hooks/useLayouts';

// Modular Components
import { WorkflowForm } from '../components/workflows/WorkflowForm';
import { ResourceCard } from '../components/ResourceCard';
import { WorkflowsPageSkeleton } from '../components/workflows/WorkflowSkeleton';

const TemplateCard = ({ id, name, type, status, lastUpdated, onDelete }: any) => {
  const actions: DropdownOption[] = [
    {
      id: 'delete',
      label: 'Destroy Workflow',
      icon: Trash2,
      onClick: onDelete,
      variant: 'danger'
    }
  ];

  return (
    <ResourceCard
      id={id}
      name={name}
      href={`/dashboard/templates/${id}`}
      icon={Send}
      typeLabel={type}
      updatedAt={lastUpdated}
      status={{
        label: status,
        type: status === 'live' || status === 'active' ? 'live' : 'draft'
      }}
      actions={
        <Dropdown 
          options={actions}
          align="right"
          trigger={
            <button className="text-ui-muted hover:text-black transition-colors p-2 rounded-md hover:bg-black/5">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          }
        />
      }
    />
  );
};

export const WorkflowsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<string | null>(null);
  
  const { 
    templates, 
    createTemplate, 
    deleteTemplate,
    isCreating, 
    isDeleting,
    isLoading: templatesLoading 
  } = useTemplates();
  
  const { layouts, isLoading: layoutsLoading } = useLayouts();
  const isLoading = templatesLoading || layoutsLoading;
  
  const handleCreate = async (data: any) => {
    try {
      await createTemplate(data);
      setIsModalOpen(false);
    } catch (err) {}
  };

  const confirmDelete = async () => {
    if (!workflowToDelete) return;
    try {
      await deleteTemplate(workflowToDelete);
      setIsDeleteDialogOpen(false);
      setWorkflowToDelete(null);
    } catch (err) {}
  };

  if (isLoading) {
    return <WorkflowsPageSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="flex items-end gap-6">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-ui-text leading-[0.8]">Workflows</h1>
        </div>
        
        <div className="flex items-end gap-6">
          <p className="text-ui-muted font-bold tracking-tight opacity-40 text-xs max-w-sm md:text-right pb-1">
            Architect and oversee your notification delivery logic.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.15em] hover:scale-[1.02] transition-all shadow-sm mb-0.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Create Workflow
          </button>
        </div>
      </div>

      <AlertDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Destroy Workflow"
        description="This will permanently remove the delivery logic. This action is irreversible."
        confirmLabel="Destroy"
        type="danger"
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => !isCreating && setIsModalOpen(false)}
        title="Create New Workflow"
        description="Select a trigger and define your notification sequence."
        maxWidth="lg"
      >
        <WorkflowForm 
          initialData={{ 
            name: '', 
            description: '', 
            event_type: '', 
            layout_id: '',
            status: 'draft' 
          }}
          onSave={handleCreate}
          isLoading={isCreating}
          mode="create"
          layouts={layouts}
          className="mt-6"
        />
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-ui-surface border border-ui-border rounded-lg p-6 shadow-sm">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-ui-muted mb-2 opacity-60">Templates</div>
          <div className="text-3xl font-black tracking-tighter text-ui-text">{templates.length}</div>
        </div>
        <div className="bg-ui-surface border border-ui-border rounded-lg p-6 shadow-sm">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-ui-muted mb-2 opacity-60">Active Live</div>
          <div className="text-3xl font-black tracking-tighter text-success">
            {templates.filter((t: any) => t.status === 'live' || t.status === 'active').length}
          </div>
        </div>
        <div className="bg-ui-surface border border-ui-border rounded-lg p-6 shadow-sm">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-ui-muted mb-2 opacity-60">Drafts</div>
          <div className="text-3xl font-black tracking-tighter text-ui-text">
            {templates.filter((t: any) => t.status === 'draft').length}
          </div>
        </div>
        <div className="bg-ui-surface border border-ui-border rounded-lg p-6 shadow-sm">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-ui-muted mb-2 opacity-60">Health</div>
          <div className="text-3xl font-black tracking-tighter text-ui-text opacity-20">100%</div>
        </div>
      </div>

      <div className="bg-ui-surface border border-ui-border rounded-lg px-3 py-2 mb-10 flex items-center gap-4 shadow-sm">
        <Search className="w-5 h-5 text-ui-muted ml-2 opacity-20" />
        <input 
          type="text" 
          placeholder="Search workflows..." 
          className="flex-1 bg-transparent border-none outline-none text-sm font-bold placeholder:text-ui-muted/30 text-ui-text"
        />
        <div className="px-3 py-1 bg-ui-bg rounded border border-ui-border">
          <span className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-60">{templates.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.length > 0 ? (
          templates.map((template: any) => (
            <TemplateCard 
              key={template.id}
              id={template.id}
              name={template.name} 
              type={template.event_type} 
              status={template.status} 
              lastUpdated={formatDate(template.updated_at)} 
              onDelete={() => {
                setWorkflowToDelete(template.id);
                setIsDeleteDialogOpen(true);
              }}
            />
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-ui-muted border border-dashed border-ui-border rounded-lg bg-ui-muted/5">
            <Send className="w-12 h-12 mb-4 opacity-5" />
            <p className="font-black text-[9px] uppercase tracking-[0.3em] opacity-40">No workflows found</p>
          </div>
        )}
      </div>
    </div>
  );
};
