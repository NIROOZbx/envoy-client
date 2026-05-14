import React, { useState } from 'react';
import { useSubscribers } from '../hooks/useSubscribers';
import { SubscriberFilters } from '../components/subscribers/SubscriberFilters';
import { SubscriberList } from '../components/subscribers/SubscriberList';
import { HeaderSkeleton, TableSkeleton } from '@/components/ui';

export const SubscribersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading, deleteSubscriber } = useSubscribers(page, 10, search);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto pb-20">
        <HeaderSkeleton />
        <TableSkeleton rows={8} cols={6} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="flex items-end gap-6">
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-ui-text leading-[0.8]">Subscribers</h1>
        </div>
        
        <div className="flex items-end gap-6">
          <p className="text-ui-muted font-bold tracking-tight opacity-60 text-xs max-w-sm md:text-right pb-1">
            Manage your notification recipients and their preferences across the entire infrastructure.
          </p>
        
        </div>
      </div>

      <div className="bg-white border border-ui-border rounded-[32px] overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-dots opacity-[0.4] pointer-events-none" />
        
        <SubscriberFilters 
          search={search}
          onSearchChange={handleSearchChange}
        />

        <SubscriberList 
          subscribers={data?.subscribers || []}
          onDelete={deleteSubscriber}
        />

        {!isLoading && (
          <div className="p-6 bg-black/[0.01] border-t border-ui-border flex items-center justify-between relative z-10">
            <div className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-40">
              Pulse: {data?.total_count || 0} active recipients in system
            </div>
           
          </div>
        )}
      </div>
    </div>
  );
};
