import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { LogRow } from './LogRow';
import { type ActivityLog } from '../../hooks/useActivityLogs';

interface LogTableProps {
    logs: ActivityLog[];
    isLoading: boolean;
    onClearFilters: () => void;
}

export const LogTable: React.FC<LogTableProps> = ({ logs, isLoading, onClearFilters }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="bg-ui-surface border border-ui-border rounded-[40px] overflow-hidden shadow-2xl relative">
            {/* Dotted Background for Table */}
            <div className="absolute inset-0 bg-dots opacity-[0.4] pointer-events-none" />

            {isLoading ? (
                <div className="py-48 flex flex-col items-center justify-center gap-6 relative z-10">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-ui-text/10 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-ui-text rounded-full animate-pulse" />
                        </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-ui-muted opacity-40">Architecting Trace Stream...</span>
                </div>
            ) : logs.length === 0 ? (
                <div className="py-10 flex flex-col items-center justify-center text-center px-6 relative z-10">
                    <div className="w-24 h-24 bg-ui-text/5 rounded-[32px] flex items-center justify-center text-ui-muted mb-10 rotate-12">
                        <AlertCircle className="w-12 h-12 opacity-10" />
                    </div>
                    <h3 className="text-4xl font-black tracking-tighter uppercase mb-3 text-ui-text">No pulses detected</h3>
                    <p className="text-ui-muted font-bold tracking-tight opacity-40 text-sm max-w-xs mx-auto mb-10">
                        The infrastructure is silent. Try adjusting your filters to locate historical logs.
                    </p>
                    <button 
                        onClick={onClearFilters}
                        className="px-10 py-4 bg-ui-text text-ui-bg rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-ui-text/20"
                    >
                        Reset Signal Scopes
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto relative z-10">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-ui-text/[0.02]">
                                <th className="py-6 px-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted opacity-40 border-b border-ui-border">Channel / Instance</th>
                                <th className="py-6 px-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted opacity-40 border-b border-ui-border">Provider Node</th>
                                <th className="py-6 px-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted opacity-40 border-b border-ui-border">Pulse Status</th>
                                <th className="py-6 px-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted opacity-40 border-b border-ui-border">Latency</th>
                                <th className="py-6 px-8 text-right text-[10px] font-black uppercase tracking-[0.3em] text-ui-muted opacity-40 border-b border-ui-border">Temporal Stamp</th>
                                <th className="py-6 px-8 border-b border-ui-border"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ui-border">
                            {logs.map((log, i) => (
                                <LogRow 
                                    key={`${log.id}-${i}`} 
                                    log={log} 
                                    isExpanded={expandedId === log.id}
                                    onToggle={() => handleToggle(log.id)} 
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
