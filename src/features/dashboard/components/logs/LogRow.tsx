import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatDate } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Zap, Globe, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { type ActivityLog } from '../../hooks/useActivityLogs';
import { DiagnosticConsole } from './DiagnosticConsole';

interface LogRowProps {
    log: ActivityLog;
    isExpanded: boolean;
    onToggle: () => void;
}

export const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered':
            return { dot: 'bg-success', text: 'text-success', label: 'Delivered' };
        case 'failed':
            return { dot: 'bg-log-failure', text: 'text-log-failure', label: 'Failed' };
        case 'processing':
        case 'sent':
            return { dot: 'bg-log-transit', text: 'text-log-transit', label: 'In Transit' };
        default:
            return { dot: 'bg-ui-muted', text: 'text-ui-muted', label: status };
    }
};

export const LogRow: React.FC<LogRowProps> = ({ log, isExpanded, onToggle }) => {
    const styles = getStatusStyles(log.delivery_status);
    
    const channelIcons: Record<string, string> = {
        email: 'Mail',
        sms: 'MessageSquare',
        push: 'Bell',
        whatsapp: 'MessageCircle',
        webhook: 'Globe',
        in_app: 'Zap'
    };
    
    const iconName = channelIcons[log.channel.toLowerCase()] || 'Globe';
    const ChannelIcon = (Icons as any)[iconName] || Globe;

    return (
        <>
            <tr 
                onClick={onToggle}
                className={cn(
                    "group cursor-pointer transition-all duration-300 relative",
                    isExpanded ? "bg-ui-text/[0.03] z-20" : "hover:bg-ui-text/[0.01]"
                )}
            >
                <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                            isExpanded ? "bg-ui-text text-ui-bg shadow-xl scale-110" : "bg-ui-text/5 text-ui-muted group-hover:bg-ui-text group-hover:text-ui-bg"
                        )}>
                            <ChannelIcon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-ui-text">{log.channel}</span>
                            <span className="text-[10px] font-bold text-ui-muted opacity-40 truncate max-w-[120px] font-mono">{log.id.split('-')[0]}</span>
                        </div>
                    </div>
                </td>

                <td className="py-6 px-8">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 flex bg-ui-text text-ui-bg rounded-xl ">
                            <span className="text-[10px] font-black uppercase tracking-widest">{log.provider || 'system'}</span>
                        </div>
                    </div>
                </td>

                <td className="py-6 px-8">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-2 h-2 rounded-full transition-all duration-500", 
                            styles.dot,
                            log.delivery_status === 'processing' && "animate-pulse"
                        )} />
                        <span className={cn("text-[11px] font-black uppercase tracking-[0.2em]", styles.text)}>
                            {styles.label}
                        </span>
                    </div>
                </td>

                <td className="py-6 px-8">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300",
                        log.duration_ms < 500 ? "bg-success/5 border-success/10 text-success" :
                        log.duration_ms < 2000 ? "bg-warning/5 border-warning/10 text-warning" :
                        "bg-destructive/5 border-destructive/10 text-destructive"
                    )}>
                        <Zap className="w-3 h-3" />
                        <span className="text-[10px] font-black">{log.duration_ms}ms</span>
                    </div>
                </td>

                <td className="py-6 px-8">
                    <div className="flex flex-col items-end">
                        <span className="text-[12px] font-black text-ui-text">
                            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                        </span>
                        <span className="text-[10px] font-bold text-ui-muted opacity-40">
                            {formatDate(log.created_at, 'HH:mm:ss')}
                        </span>
                    </div>
                </td>

                <td className="py-6 px-8 w-10">
                    <ChevronDown className={cn(
                        "w-4 h-4 text-ui-muted transition-transform duration-500",
                        isExpanded ? "rotate-180" : "opacity-0 group-hover:opacity-100"
                    )} />
                </td>
            </tr>

            <AnimatePresence>
                {isExpanded && (
                    <tr>
                        <td colSpan={6} className="p-0 border-none">
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="overflow-hidden bg-ui-surface shadow-inner"
                            >
                                <DiagnosticConsole log={log} />
                            </motion.div>
                        </td>
                    </tr>
                )}
            </AnimatePresence>
        </>
    );
};
