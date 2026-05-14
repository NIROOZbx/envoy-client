import React from 'react';
import { Loader2 } from 'lucide-react';
import { SubscriberRow } from './SubscriberRow';
import { type Subscriber } from '../../api/subscribers';

interface SubscriberListProps {
  subscribers: Subscriber[];
  onDelete: (id: string) => void;
}

export const SubscriberList: React.FC<SubscriberListProps> = ({ 
  subscribers, 
  onDelete 
}) => {

  return (
    <div className="relative z-15 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-ui-text/[0.01]">
            <th className="py-4 pl-6 text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted border-b border-ui-border">External User ID</th>
            <th className="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted border-b border-ui-border">Channel</th>
            <th className="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted border-b border-ui-border">Contact Value</th>
            <th className="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted border-b border-ui-border">Status</th>
            <th className="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted border-b border-ui-border">Joined</th>
            <th className="py-4 pr-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted border-b border-ui-border">Control</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ui-border">
          {subscribers.map((subscriber) => (
            <SubscriberRow 
              key={subscriber.id} 
              subscriber={subscriber} 
              onDelete={onDelete}
            />
          ))}
          {subscribers.length === 0 && (
            <tr>
              <td colSpan={6} className="py-20 text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-20 italic">No matching signals detected in current scope</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
