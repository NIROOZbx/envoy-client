import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Layers } from 'lucide-react';
import { Modal, AlertDialog, Spinner } from '@/components/ui';
import { useTemplateChannels } from '../../hooks/useTemplateChannels';
import { ChannelRow } from './ChannelRow';
import { ChannelForm } from './ChannelForm';
import type { TemplateChannelResponse, UpdateTemplateChannelRequest } from '../../api/templateChannels';

interface Props {
  templateId: string;
}

export const TemplateChannelsPanel: React.FC<Props> = ({ templateId }) => {
  const { 
    channels, 
    isLoading, 
    isCreating, 
    isUpdating, 
    isDeleting, 
    addChannel, 
    updateChannel, 
    removeChannel 
  } = useTemplateChannels(templateId);

  const [addOpen, setAddOpen]   = useState(false);
  const [editing, setEditing]   = useState<TemplateChannelResponse | null>(null);
  const [deleting, setDeleting] = useState<TemplateChannelResponse | null>(null);

  const handleAdd    = async (data: any) => { await addChannel(data); setAddOpen(false); };
  const handleEdit   = async (data: UpdateTemplateChannelRequest) => { await updateChannel({ channelId: editing!.id, data }); setEditing(null); };
  const handleToggle = (ch: TemplateChannelResponse) => updateChannel({ channelId: ch.id, data: { is_active: !ch.is_active } });
  const handleDelete = async () => { await removeChannel(deleting!.id); setDeleting(null); };

  return (
    <div className="bg-ui-surface border border-ui-border rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-3 border-b border-ui-border bg-black/[0.015] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers className="w-3.5 h-3.5 text-ui-muted opacity-50" />
          <h2 className="text-[9px] font-black uppercase tracking-widest text-ui-muted">Delivery Channels</h2>
          {channels.length > 0 && (
            <span className="px-1.5 py-0.5 bg-black text-white rounded text-[8px] font-black tracking-widest">
              {channels.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md font-black text-[9px] uppercase tracking-[0.15em] hover:scale-[1.03] transition-all shadow-sm disabled:opacity-40"
        >
          <Plus className="w-3 h-3" /> Add Channel
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Spinner className="w-6 h-6 text-ui-muted opacity-20" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ui-muted animate-pulse">
              Syncing channels...
            </span>
          </div>
        ) : channels.length === 0 ? (
          <div className="py-10 flex flex-col items-center gap-3 text-ui-muted/40 text-center">
            <Layers className="w-10 h-10 opacity-5" />
            <p className="text-[9px] font-black uppercase tracking-[0.2em]">No channels configured</p>
            <p className="text-[10px] font-medium max-w-xs opacity-70">
              Select at least one delivery channel for this workflow.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {channels.map((ch) => (
              <ChannelRow
                key={ch.id}
                channel={ch}
                onEdit={setEditing}
                onDelete={setDeleting}
                onToggle={handleToggle}
                isUpdating={isUpdating}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={addOpen}
        onClose={() => !isCreating && setAddOpen(false)}
        title="Add Delivery Channel"
        description="Select a channel type and draft its content."
        maxWidth="lg"
      >
        <div className="mt-4">
          <ChannelForm
            mode="create"
            onSubmit={handleAdd}
            isLoading={isCreating}
            onCancel={() => setAddOpen(false)}
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editing}
        onClose={() => !isUpdating && setEditing(null)}
        title="Edit Channel"
        description={`Update the ${editing?.channel?.toUpperCase()} delivery configuration.`}
        maxWidth="lg"
      >
        {editing && (
          <div className="mt-4">
            <ChannelForm
              mode="edit"
              channel={editing}
              onSubmit={handleEdit}
              isLoading={isUpdating}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}
      </Modal>

      {/* Delete confirm */}
      <AlertDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Remove Channel"
        description={`Delete the ${deleting?.channel?.toUpperCase()} channel?`}
        confirmLabel="Remove"
        type="danger"
      />
    </div>
  );
};
