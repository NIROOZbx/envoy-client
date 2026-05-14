import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsHeroCardProps {
    title: string;
    value: string;
    tagline: string;
    metrics: {
        label: string;
        value: string;
        trend: number;
        description?: string;
        icon?: React.ElementType;
        color?: string;
        bgClass?: string;
        trendColor?: 'success' | 'destructive';
    }[];
}

export const AnalyticsHeroCard: React.FC<AnalyticsHeroCardProps> = ({ title, value, tagline, metrics }) => {
    return (
        <div className="bg-white border border-ui-border rounded-[24px] p-6 sm:p-8 shadow-sm h-full">
            <div className="mb-8">
                <h3 className="text-[14px] font-bold text-ui-muted mb-4 uppercase tracking-widest">{title}</h3>
                <div className="text-4xl sm:text-5xl font-black tracking-tighter text-ui-text mb-4">
                    {value}
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shrink-0" />
                    <p className="text-[12px] font-bold text-ui-muted opacity-40 truncate">{tagline}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, i) => {
                    const isSuccess = m.trendColor ? m.trendColor === 'success' : m.trend > 0;

                    return (
                        <div key={i} className={cn(
                            "relative rounded-[16px] p-4 border border-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] group overflow-hidden shadow-(--black-5)",
                            "bg-linear-to-br from-[#fdfdfd] via-[#f5f5f5] to-[#e8e8e8]"
                        )}>
                            {/* Subtle Brushed Metal Reflection */}
                            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                            <div className="flex items-center gap-2.5 mb-3 relative z-10">
                                <div className="w-7 h-7 shrink-0 rounded-lg bg-white/80 shadow-sm border border-black/5 flex items-center justify-center">
                                    {m.icon ? (
                                        <m.icon className={cn("w-3.5 h-3.5", "text-black")} />
                                    ) : (
                                        <div className={cn("w-1.5 h-1.5 rounded-full", m.color || "bg-black")} />
                                    )}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-ui-muted truncate whitespace-nowrap">{m.label}</span>
                            </div>

                            <div className="flex items-end justify-between gap-2 relative z-10">
                                <div className="min-w-0 flex-1">
                                    <div className="text-[20px] font-black text-ui-text tracking-tighter leading-none truncate">{m.value}</div>
                                    {m.description && (
                                        <p className="text-[9px] font-bold text-ui-muted opacity-50 truncate whitespace-nowrap mt-1.5">{m.description}</p>
                                    )}
                                </div>

                                <div className={cn(
                                    "flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black shrink-0 shadow-(--black-5) border transition-all duration-500",
                                    isSuccess
                                        ? "bg-success/5 text-success border-success/20 group-hover:bg-success/10 group-hover:border-success/30"
                                        : "bg-destructive/5 text-destructive border-destructive/20 group-hover:bg-destructive/10 group-hover:border-destructive/30"
                                )}>
                                    {m.trend > 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                                    <span>{Math.abs(m.trend)}%</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
