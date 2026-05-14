import React from 'react';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import { cn } from '@/lib/utils';

export type AlertType = 'warning' | 'danger' | 'info' | 'success';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: AlertType;
  isLoading?: boolean;
}

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    color: 'text-warning',
    bg: 'bg-warning/10',
    btn: 'bg-warning hover:opacity-90 shadow-warning/20',
  },
  danger: {
    icon: AlertTriangle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    btn: 'bg-destructive hover:opacity-90 shadow-destructive/20',
  },
  info: {
    icon: Info,
    color: 'text-black',
    bg: 'bg-black/5',
    btn: 'bg-black hover:bg-black/90 shadow-black/10',
  },
  success: {
    icon: CheckCircle2,
    color: 'text-success',
    bg: 'bg-success/10',
    btn: 'bg-success hover:opacity-90 shadow-success/20',
  },
};

export const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  type = 'info',
  isLoading = false,
}) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title} 
      maxWidth="sm"
      showClose={!isLoading}
    >
      <div className="flex flex-col items-center text-center">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-500 animate-in zoom-in-50",
          config.bg,
          config.color
        )}>
          <Icon className="w-6 h-6" />
        </div>
        
        <p className="text-[11px] font-medium text-black/50 mb-8 px-2 leading-relaxed">
          {description}
        </p>

        <div className="flex gap-2 w-full">
          <button 
            disabled={isLoading}
            onClick={onClose}
            className="flex-1 py-3 border border-ui-border rounded-md font-black text-[10px] uppercase tracking-widest hover:bg-black/5 transition-all disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button 
            disabled={isLoading}
            onClick={onConfirm}
            className={cn(
              "flex-1 py-3 text-white rounded-md font-black text-[10px] uppercase tracking-widest transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2",
              config.btn
            )}
          >
            {isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
