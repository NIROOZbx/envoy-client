import React, { useState } from 'react';
import { Mail, Phone, Calendar, Trash2, ShieldCheck, ShieldAlert, ChevronDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { AlertDialog } from '@/components/ui';
import { type Subscriber } from '../../api/subscribers';
import { SubscriberPreferences } from './SubscriberPreferences';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SubscriberRowProps {
  subscriber: Subscriber;
  onDelete: (id: string) => void;
}

export const SubscriberRow: React.FC<SubscriberRowProps> = ({ subscriber, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isEmail = subscriber.channel === 'email';
  const Icon = isEmail ? Mail : Phone;

  return (
    <>
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "group cursor-pointer transition-all border-b border-ui-border",
          isExpanded ? "bg-ui-text/[0.02]" : "hover:bg-ui-text/[0.01]"
        )}
      >
        <td className="py-4 pl-6">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center text-ui-bg font-black text-xs shadow-lg transition-all duration-500",
              isExpanded ? "bg-ui-text scale-110 rotate-3" : "bg-ui-text shadow-ui-text/10"
            )}>
              {subscriber.external_user_id.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-black text-[13px] tracking-tight text-ui-text">
                {subscriber.external_user_id}
              </div>
              <div className="text-[10px] font-bold text-ui-muted uppercase tracking-[0.1em] opacity-60 font-mono">
                ID: {subscriber.id.split('-')[0]}...
              </div>
            </div>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-ui-text/[0.03] border border-ui-border rounded-md text-[8px] font-black uppercase tracking-widest text-ui-muted">
              {subscriber.channel}
            </span>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ui-text/70">
            <Icon className="w-3.5 h-3.5 opacity-20" />
            {subscriber.contact_value}
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-2">
            {subscriber.is_verified ? (
              <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-success">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-ui-muted-subtle">
                <ShieldAlert className="w-3 h-3" />
                Pending
              </div>
            )}
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ui-text/70">
            <Calendar className="w-3.5 h-3.5 opacity-20" />
            {formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true })}
          </div>
        </td>
        <td className="py-4 pr-6 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteDialogOpen(true);
              }}
              className="p-2 hover:bg-destructive/10 rounded-lg text-ui-muted-subtle hover:text-destructive transition-all"
              title="Delete Recipient"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500",
              isExpanded ? "bg-ui-text text-ui-bg rotate-180" : "text-ui-muted-subtle"
            )}>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </td>
      </tr>

      {/* Preferences Expansion */}
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={6} className="p-0 border-b border-ui-border">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden bg-dots"
              >
                <SubscriberPreferences externalUserId={subscriber.external_user_id} />
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(subscriber.id);
          setIsDeleteDialogOpen(false);
        }}
        title="Delete Recipient"
        description={`This will permanently remove ${subscriber.external_user_id} and all their channel preferences. This action cannot be undone.`}
        confirmLabel="Delete"
        type="danger"
      />
    </>
  );
};
