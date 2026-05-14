import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ApiKeyManager } from '../components/apiKeys/ApiKeyManager';

export const ApiKeysPage: React.FC = () => {
  const { environmentId } = useOutletContext<{ environmentId: string | null }>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (!environmentId) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-ui-muted">
        <p className="font-black text-[10px] uppercase tracking-[0.3em] opacity-40">Environment required for API access</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="flex items-end gap-6">
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-ui-text leading-[0.8]">API Keys</h1>
        </div>
        
        <div className="flex items-end gap-6">
          <p className="text-ui-muted font-bold tracking-tight opacity-60 text-xs max-w-sm md:text-right pb-1">
            Manage secure access to the notification engine for this environment.
          </p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.05] active:scale-[0.98] transition-all shadow-sm mb-0.5 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            Generate Key
          </button>
        </div>
      </div>

      {/* Logic Container */}
      <ApiKeyManager externalCreateOpen={isCreateModalOpen} onExternalCreateClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
};
