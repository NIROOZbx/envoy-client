import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { type ActivityLog } from '../../hooks/useActivityLogs';

interface ActivityLogDrawerProps {
    log: ActivityLog | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ActivityLogDrawer: React.FC<ActivityLogDrawerProps> = ({ log, isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timeout);
        }
    }, [copied]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    };

    const steps = log ? [
        { label: 'CREATED', time: log.created_at, desc: 'System received trigger', icon: Terminal },
        { label: 'HANDOFF', time: log.created_at, desc: `Sent to ${log.provider || 'Provider'}`, icon: Zap },
        { 
            label: log.delivery_status === 'failed' ? 'FAILED' : 'DELIVERED', 
            time: log.failed_at || log.delivered_at || log.created_at, 
            desc: log.delivery_status === 'failed' ? 'Delivery rejected' : 'In User Inbox',
            icon: log.delivery_status === 'failed' ? X : ShieldCheck,
            isLast: true,
            status: log.delivery_status
        }
    ] : [];

    return (
        <div className={cn("fixed inset-0 z-1000", !isOpen && "pointer-events-none")}>
            {/* Backdrop */}
            <div 
                className={cn(
                    "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div 
                className={cn(
                    "absolute top-0 right-0 h-full w-full max-w-xl bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transform transition-transform duration-500 ease-in-out border-l border-ui-border",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {!log ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
                    </div>
                ) : (
                    <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-8 border-b border-ui-border flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter uppercase text-ui-text">Notification Deep Dive</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted opacity-40">Event ID: {log.id}</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-12">
                        {/* Status Pulse */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-ui-muted">Status Pulse</h3>
                            </div>

                            <div className="space-y-0 relative">
                                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-ui-border" />
                                {steps.map((step, i) => (
                                    <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 transition-colors",
                                            step.status === 'failed' ? "bg-white border-destructive text-destructive" :
                                            step.status === 'delivered' ? "bg-white border-success text-success" :
                                            "bg-white border-ui-border text-ui-muted"
                                        )}>
                                            <step.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={cn(
                                                    "text-[11px] font-black tracking-widest uppercase",
                                                    step.status === 'failed' ? "text-destructive" :
                                                    step.status === 'delivered' ? "text-success" :
                                                    "text-ui-text"
                                                )}>
                                                    {step.label}
                                                </span>
                                                <span className="text-[10px] font-bold text-ui-muted opacity-40">{formatDate(step.time, 'HH:mm:ss')}</span>
                                            </div>
                                            <p className="text-xs font-medium text-ui-muted">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Provider Insight */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-ui-muted">Provider Insight</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-40 mb-2 block">Provider Message ID</label>
                                    <div className="flex items-center gap-2 p-4 bg-black/[0.02] border border-ui-border rounded-xl group">
                                        <code className="text-xs font-bold text-ui-text flex-1 break-all">{log.provider_message_id || 'N/A'}</code>
                                        <button 
                                            onClick={() => log.provider_message_id && handleCopy(log.provider_message_id)}
                                            className="p-2 hover:bg-black/5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-ui-muted" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-40 mb-2 block">Response Payload</label>
                                    <div className="bg-[#0D0D0D] rounded-2xl p-6 overflow-hidden relative group">
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleCopy(log.provider_response)}
                                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                            >
                                                <Copy className="w-3.5 h-3.5 text-white/60" />
                                            </button>
                                        </div>
                                        <pre className="text-[11px] font-mono text-white/80 overflow-x-auto">
                                            {(() => {
                                                try {
                                                    const parsed = JSON.parse(log.provider_response);
                                                    return JSON.stringify(parsed, null, 2);
                                                } catch (e) {
                                                    return log.provider_response || '{}';
                                                }
                                            })()}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Action */}
                    <div className="p-8 border-t border-ui-border bg-gray-50/50">
                        <button 
                            className="w-full py-4 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all"
                            onClick={onClose}
                        >
                            Close Deep Dive
                        </button>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
};
