import React, { useState, useEffect } from 'react';
import { Globe, ShieldCheck } from 'lucide-react';
import { Modal, AlertDialog } from '@/components/ui';
import { useChannelConfigs } from '../../hooks/useChannelConfigs';
import { IntegrationRow } from './IntegrationRow';
import { IntegrationForm } from './IntegrationForm';
import type { ChannelConfigResponse } from '../../api/channelConfigs';
import { IntegrationSkeleton } from '@/components/ui';

interface IntegrationManagerProps {
  externalAddOpen?: boolean;
  onExternalAddClose?: () => void;
}

export const IntegrationManager: React.FC<IntegrationManagerProps> = ({ externalAddOpen, onExternalAddClose }) => {
  const {
    configs,
    isLoading,
    createConfig,
    updateConfig,
    deleteConfig,
    setDefaultConfig,
    isCreating,
    isUpdating,
    isDeleting,
  } = useChannelConfigs();

  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<ChannelConfigResponse | null>(null);
  const [deleting, setDeleting] = useState<ChannelConfigResponse | null>(null);

  // Sync with external state
  useEffect(() => {
    if (externalAddOpen !== undefined) {
      setAddOpen(externalAddOpen);
    }
  }, [externalAddOpen]);

  const handleCloseAdd = () => {
    setAddOpen(false);
    if (onExternalAddClose) onExternalAddClose();
  };

  const handleCreate = async (data: any) => {
    try {
      await createConfig(data);
      handleCloseAdd();
    } catch (err) {}
  };

  const handleUpdate = async (data: any) => {
    try {
      await updateConfig({ configId: editing!.id, data });
      setEditing(null);
    } catch (err) {}
  };

  const handleToggle = async (config: ChannelConfigResponse) => {
    try {
      await updateConfig({ configId: config.id, data: { is_active: !config.is_active } });
    } catch (err) {}
  };

  if (isLoading) {
    return <IntegrationSkeleton />;
  }

  return (
    <div className="space-y-10">
      {/* Security Banner */}
      <div className="bg-ui-surface border border-ui-border rounded-lg p-6 flex gap-6 items-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <ShieldCheck className="w-32 h-32" />
        </div>
        <div className="w-10 h-10 bg-black/5 rounded-md flex items-center justify-center text-ui-text shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-black text-ui-text uppercase tracking-widest mb-1 text-[9px]">Secure Credentials</h4>
          <p className="text-[11px] font-medium text-ui-muted leading-relaxed max-w-2xl opacity-70">
            All provider credentials are encrypted at rest. We recommend using scoped keys for each environment.
          </p>
        </div>
      </div>

      {/* List Container */}
      {configs.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-ui-muted border border-dashed border-ui-border rounded-lg bg-black/[0.01]">
          <Globe className="w-16 h-16 mb-4 opacity-5" />
          <p className="font-black text-[10px] uppercase tracking-[0.3em] opacity-40 mb-6">No providers connected</p>
          <button 
            onClick={() => setAddOpen(true)}
            className="text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-black text-white rounded-md shadow-sm hover:scale-105 transition-all"
          >
            Connect First Provider
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1 mb-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ui-muted opacity-50">Connected Channels ({configs.length})</span>
          </div>
          {configs.map((config) => (
            <IntegrationRow
              key={config.id}
              config={config}
              onEdit={setEditing}
              onDelete={setDeleting}
              onToggle={handleToggle}
              onSetDefault={(c) => setDefaultConfig(c.id)}
              isUpdating={isUpdating}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={addOpen}
        onClose={() => !isCreating && handleCloseAdd()}
        title="Connect New Provider"
        description="Integrate your workspace with a delivery channel."
        maxWidth="lg"
      >
        <div className="mt-6">
          <IntegrationForm
            mode="create"
            onSubmit={handleCreate}
            onCancel={handleCloseAdd}
            isLoading={isCreating}
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editing}
        onClose={() => !isUpdating && setEditing(null)}
        title="Update Integration"
        description={`Modifying settings for ${editing?.display_name}`}
        maxWidth="lg"
      >
        {editing && (
          <div className="mt-6">
            <IntegrationForm
              mode="edit"
              initialData={editing}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
              isLoading={isUpdating}
            />
          </div>
        )}
      </Modal>

      {/* Delete Alert */}
      <AlertDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={async () => {
          await deleteConfig(deleting!.id);
          setDeleting(null);
        }}
        isLoading={isDeleting}
        title="Disconnect Provider"
        description={`Permanently remove "${deleting?.display_name}"? Workflows using this config will fail.`}
        confirmLabel="Disconnect"
        type="danger"
      />
    </div>
  );
};
