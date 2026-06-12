import React, { useState } from 'react';
import { Plus, Search, Layout as LayoutIcon } from 'lucide-react';
import { Modal, AlertDialog } from '@/components/ui';
import { useLayouts } from '../hooks/useLayouts';

// Modular Components
import { LayoutCard } from '../components/layouts/LayoutCard';
import { LayoutForm } from '../components/layouts/LayoutForm';
import { HeaderSkeleton, SearchBarSkeleton, CardGridSkeleton } from '@/components/ui';

export const LayoutsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [layoutToDelete, setLayoutToDelete] = useState<string | null>(null);
  
  const { 
    layouts, 
    createLayout, 
    deleteLayout, 
    setDefaultLayout,
    isCreating, 
    isDeleting,
    isLoading,
    isSettingDefault 
  } = useLayouts();

  const handleCreate = async (data: any) => {
    try {
      await createLayout(data);
      setIsModalOpen(false);
    } catch (err) {}
  };

  const confirmDelete = async () => {
    if (!layoutToDelete) return;
    try {
      await deleteLayout(layoutToDelete);
      setIsDeleteDialogOpen(false);
      setLayoutToDelete(null);
    } catch (err) {}
  };
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto pb-20">
        <HeaderSkeleton />
        <SearchBarSkeleton />
        <CardGridSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="flex items-end gap-6">
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-ui-text leading-[0.8]">Layouts</h1>
        </div>
        
        <div className="flex items-end gap-6">
            <p className="text-ui-muted font-bold tracking-tight opacity-60 text-xs max-w-sm md:text-right pb-1">
                Standardize your brand identity across all delivery channels.
            </p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.15em] hover:scale-[1.02] transition-all shadow-sm mb-0.5 whitespace-nowrap"
            >
                <Plus className="w-4 h-4" />
                Create Layout
            </button>
        </div>
      </div>

      <AlertDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Destroy Layout"
        description="This action is permanent and may affect active notification templates."
        confirmLabel="Destroy"
        type="danger"
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => !isCreating && setIsModalOpen(false)}
        title="Create New Layout"
        description="Define a reusable HTML structure for your templates."
        maxWidth="2xl"
      >
        <LayoutForm 
          initialData={{ 
            name: '', 
            html: '<html>\n  <body>\n    {{content}}\n  </body>\n</html>',
            is_default: false 
          }}
          onSave={handleCreate}
          isLoading={isCreating}
          mode="create"
          showDefaultCheckbox={true}
          className="mt-6"
        />
      </Modal>

      <div className="bg-ui-surface border border-ui-border rounded-lg px-3 py-2 mb-10 flex items-center gap-4 shadow-sm">
        <Search className="w-5 h-5 text-ui-muted ml-2 opacity-20" />
        <input 
          type="text" 
          placeholder="Search layouts..." 
          className="flex-1 bg-transparent border-none outline-none text-sm font-bold placeholder:text-ui-muted/30 text-ui-text"
        />
        <div className="px-3 py-1 bg-ui-bg rounded border border-ui-border">
          <span className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-60">{layouts.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {layouts.length > 0 ? (
          layouts.map((layout: any) => (
            <LayoutCard 
              key={layout.id}
              id={layout.id}
              name={layout.name}
              createdAt={layout.created_at}
              isDefault={layout.is_default}
              onDelete={() => {
                setLayoutToDelete(layout.id);
                setIsDeleteDialogOpen(true);
              }}
              onSetDefault={() => setDefaultLayout(layout.id)}
              isSettingDefault={isSettingDefault}
            />
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-ui-muted border border-dashed border-ui-border rounded-lg bg-ui-muted/5">
            <LayoutIcon className="w-12 h-12 mb-4 opacity-5" />
            <p className="font-black text-[9px] uppercase tracking-[0.3em] opacity-40">No layouts found</p>
          </div>
        )}
      </div>
    </div>
  );
};
