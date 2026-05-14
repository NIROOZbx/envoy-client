import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SubscriberFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
}

export const SubscriberFilters: React.FC<SubscriberFiltersProps> = ({
  search,
  onSearchChange
}) => {
  return (
    <div className="p-6 border-b border-ui-border flex items-center justify-between bg-black/[0.015] relative z-10">
      <div className="flex items-center gap-4 flex-1 max-w-md bg-white border border-ui-border rounded-2xl px-4 py-1 group focus-within:border-black transition-colors">
        <Search className="w-4 h-4 text-ui-muted opacity-30 group-focus-within:opacity-100" />
        <input
          type="text"
          placeholder="Search recipients..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none outline-none text-xs font-black w-full py-3 placeholder:text-ui-muted/20 uppercase tracking-widest"
        />
      </div>
      <button className="flex items-center gap-2 px-6 py-3 hover:bg-black text-ui-muted hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
        <Filter className="w-3.5 h-3.5" />
        Signal Scopes
      </button>
    </div>
  );
};
