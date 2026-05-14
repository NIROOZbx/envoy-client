import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { IntegrationManager } from '../components/integrations/IntegrationManager';

export const IntegrationsPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="flex items-end gap-6">
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-ui-text leading-[0.8]">Integrations</h1>
        </div>
        
        <div className="flex items-end gap-6">
            <p className="text-ui-muted font-bold tracking-tight opacity-60 text-xs max-w-sm md:text-right pb-1">
                Manage your workspace-wide notification delivery providers.
            </p>
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.05] active:scale-[0.98] transition-all shadow-sm mb-0.5 whitespace-nowrap"
            >
                <Plus className="w-3.5 h-3.5" />
                Add Provider
            </button>
        </div>
      </div>

      {/* Logic Container */}
      <IntegrationManager externalAddOpen={isAddModalOpen} onExternalAddClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
