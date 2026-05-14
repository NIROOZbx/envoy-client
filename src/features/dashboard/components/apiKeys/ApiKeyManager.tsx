import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck } from 'lucide-react';
import { Modal, AlertDialog } from '@/components/ui';
import { useApiKeys } from '../../hooks/useApiKeys';
import { ApiKeyRow } from './ApiKeyRow';
import { ApiKeyForm } from './ApiKeyForm';
import { ApiKeyReveal } from './ApiKeyReveal';
import type { APIKeyInfo, CreateAPIKeyResponse } from '../../api/apiKeys';
import { ApiKeySkeleton } from '@/components/ui';

interface ApiKeyManagerProps {
  externalCreateOpen?: boolean;
  onExternalCreateClose?: () => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ externalCreateOpen, onExternalCreateClose }) => {
  const {
    keys,
    isLoading,
    createApiKey,
    deleteApiKey,
    revokeApiKey,
    isCreating,
    isDeleting,
    isRevoking,
  } = useApiKeys();

  const [createOpen, setCreateOpen] = useState(false);
  const [newKey, setNewKey] = useState<CreateAPIKeyResponse | null>(null);
  const [revoking, setRevoking] = useState<APIKeyInfo | null>(null);
  const [deleting, setDeleting] = useState<APIKeyInfo | null>(null);

  // Sync with external state
  useEffect(() => {
    if (externalCreateOpen !== undefined) {
      setCreateOpen(externalCreateOpen);
    }
  }, [externalCreateOpen]);

  const handleCloseCreate = () => {
    setCreateOpen(false);
    if (onExternalCreateClose) onExternalCreateClose();
  };

  const handleCreate = async (data: any) => {
    try {
      const result = await createApiKey(data);
      setNewKey(result);
      handleCloseCreate();
    } catch (err) {}
  };

  const handleRevoke = async () => {
    if (!revoking) return;
    try {
      await revokeApiKey(revoking.id);
      setRevoking(null);
    } catch (err) {}
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await deleteApiKey(deleting.id);
      setDeleting(null);
    } catch (err) {}
  };

  if (isLoading) {
    return <ApiKeySkeleton />;
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
          <h4 className="font-black text-ui-text uppercase tracking-widest mb-1 text-[9px]">Secure Authentication</h4>
          <p className="text-[11px] font-medium text-ui-muted leading-relaxed max-w-2xl opacity-70">
            Use these keys to authenticate server-side requests. Keep them secret and never share them in client-side code.
          </p>
        </div>
      </div>

      {/* List Container */}
      <div className="space-y-6">
        {keys.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-ui-muted border border-dashed border-ui-border rounded-lg bg-black/[0.01]">
            <Key className="w-16 h-16 mb-4 opacity-5" />
            <p className="font-black text-[10px] uppercase tracking-[0.3em] opacity-40 mb-6">No API keys found</p>
            <button 
              onClick={() => setCreateOpen(true)}
              className="px-6 py-3 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-sm"
            >
              Generate First Key
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2 px-1 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ui-muted opacity-50">Active Credentials ({keys.length})</span>
            </div>
            {keys.map((key) => (
              <ApiKeyRow
                key={key.id}
                apiKey={key}
                onRevoke={setRevoking}
                onDelete={setDeleting}
                isRevoking={isRevoking}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={createOpen}
        onClose={() => !isCreating && handleCloseCreate()}
        title="Generate API Key"
        description="Create a new credential to access the engine."
        maxWidth="lg"
      >
        <div className="mt-6">
          <ApiKeyForm
            onSubmit={handleCreate}
            onCancel={handleCloseCreate}
            isLoading={isCreating}
          />
        </div>
      </Modal>

      {/* Reveal Modal (Once-only) */}
      <Modal
        isOpen={!!newKey}
        onClose={() => setNewKey(null)}
        title="New API Key Generated"
        description={`Securely store your key for "${newKey?.label}"`}
        maxWidth="lg"
        showClose={true}
      >
        {newKey && (
          <div className="mt-6 animate-in zoom-in-95 duration-300">
            <ApiKeyReveal rawKey={newKey.raw_key} />
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setNewKey(null)}
                className="px-8 py-3 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                I have saved this key
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Revoke Alert */}
      <AlertDialog
        isOpen={!!revoking}
        onClose={() => setRevoking(null)}
        onConfirm={handleRevoke}
        isLoading={isRevoking}
        title="Revoke API Key"
        description={`Are you sure you want to revoke "${revoking?.label}"? Services using this key will immediately lose access.`}
        confirmLabel="Revoke"
        type="danger"
      />

      {/* Delete Alert */}
      <AlertDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete API Key"
        description={`Permanently remove "${deleting?.label}"? This action is irreversible.`}
        confirmLabel="Delete"
        type="danger"
      />
    </div>
  );
};
