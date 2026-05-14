import React from 'react';
import { Link } from 'react-router-dom';
import { cn, formatDate } from '@/lib/utils';

interface ProviderHealthTableProps {
    health: any;
    aggregate: any;
    providers: any[];
}

export const ProviderHealthTable: React.FC<ProviderHealthTableProps> = ({ health, aggregate, providers }) => {
    return (
        <div className="bg-white border border-ui-border rounded-[24px] overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b border-ui-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-[14px] font-bold text-ui-text tracking-tight">Active Infrastructure Health</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#F8F9FA] rounded-full text-[10px] font-black uppercase tracking-widest text-ui-muted border border-ui-border">
                    Live Monitor
                </button>
            </div>
            <div className="p-0 overflow-x-auto scrollbar-hide">
                <table className="w-full min-w-[700px]">
                    <thead>
                        <tr className="bg-[#F8F9FA] border-b border-ui-border">
                            <th className="text-left py-4 px-6 sm:px-8 text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-40">Provider</th>
                            <th className="text-left py-4 px-6 sm:px-8 text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-40">Status</th>
                            <th className="text-left py-4 px-6 sm:px-8 text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-40">Total Units</th>
                            <th className="text-left py-4 px-6 sm:px-8 text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-40">Avg Latency</th>
                            <th className="text-left py-4 px-6 sm:px-8 text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-40 text-right">Last Sync</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ui-border">
                        {health?.active_providers.map((row: any, idx: number) => {
                            const providerName = row?.Provider || 'Unknown';
                            const avgLatency = row?.AvgLatency || 0;
                            const lastSync = row?.LastSync;
                            
                            const isMostUsed = providerName.toLowerCase() === aggregate?.most_used_provider?.toLowerCase();
                            const stats = providers.find(p => p.name.toLowerCase() === providerName.toLowerCase());
                            
                            const isDegraded = avgLatency > 1000;
                            const isOptimal = avgLatency < 500;
                            
                            return (
                                <tr key={idx} className="hover:bg-[#F8F9FA] transition-colors group">
                                    <td className="py-5 px-6 sm:px-8 font-bold text-sm text-ui-text uppercase tracking-tight">
                                        <div className="flex items-center gap-3">
                                            <Link 
                                                to={`/dashboard/logs?provider=${providerName.toLowerCase()}`}
                                                className="hover:underline transition-all"
                                            >
                                                {providerName}
                                            </Link>
                                            {isMostUsed && (
                                                <div className="px-2 py-0.5 rounded-full bg-black text-white text-[8px] font-black uppercase tracking-widest">
                                                    Most Used
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 sm:px-8">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full animate-pulse",
                                                isOptimal ? "bg-success" : isDegraded ? "bg-destructive" : "bg-warning"
                                            )} />
                                            <span className={cn(
                                                "text-[10px] font-black uppercase",
                                                isOptimal ? "text-success" : isDegraded ? "text-destructive" : "text-warning"
                                            )}>
                                                {isOptimal ? 'Optimal' : isDegraded ? 'Degraded' : 'Normal'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 sm:px-8 text-sm font-bold text-ui-text opacity-80">
                                        {stats?.count.toLocaleString() || '0'}
                                    </td>
                                    <td className="py-5 px-6 sm:px-8 text-sm font-bold text-ui-muted opacity-60">{avgLatency}ms</td>
                                    <td className="py-5 px-6 sm:px-8 text-sm font-black text-ui-text text-right opacity-40 group-hover:opacity-100 transition-opacity">
                                        {lastSync ? formatDate(lastSync, 'HH:mm') : '--:--'}
                                    </td>
                                </tr>
                            );
                        })}
                        {(!health?.active_providers || health.active_providers.length === 0) && (
                            <tr>
                                <td colSpan={5} className="py-20 px-8 text-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-30 italic block max-w-xs mx-auto">
                                        No active provider data detected for this period
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
