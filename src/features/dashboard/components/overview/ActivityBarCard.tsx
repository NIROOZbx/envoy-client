import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityBarCardProps {
    title: string;
    data: {
        label: string;
        value: number; // Total Sent
        maxValue: number;
        deliveredValue: number;
        failedValue: number;
    }[];
}

import { BarSegment } from './BarSegment';

export const ActivityBarCard: React.FC<ActivityBarCardProps> = ({ title, data }) => {
    const showEvery = data.length > 15 ? 5 : data.length > 7 ? 2 : 1;
    const maxValue = data[0]?.maxValue || 100;

    return (
        <div className="h-[450px] flex flex-col group/chart">
            <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                    <h3 className="text-[14px] font-bold text-ui-text tracking-tight">{title}</h3>
                    <p className="text-[10px] font-bold text-ui-muted opacity-30 uppercase tracking-[0.2em]">Architectural Activity Flow</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FA] rounded-full text-[10px] font-black uppercase tracking-widest text-ui-muted border border-ui-border hover:bg-black hover:text-white transition-all">
                        <Filter className="w-3.5 h-3.5" />
                        Full Series
                    </button>
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-1.5 min-h-[280px] relative px-2">
                {/* Y-Axis Metrics */}
                <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between text-[8px] font-black uppercase tracking-widest text-ui-muted opacity-40 pointer-events-none">
                    <span>{maxValue}</span>
                    <span>{Math.round(maxValue / 2)}</span>
                    <span>0</span>
                </div>

                {data.map((item, idx) => (
                    <BarSegment
                        key={idx}
                        delivered={item.deliveredValue}
                        failed={item.failedValue}
                        processing={item.value - item.deliveredValue - item.failedValue}
                        unused={Math.max(item.maxValue - item.value, 0)}
                        maxValue={item.maxValue}
                        label={item.label}
                    />
                ))}
            </div>

            {/* Scale Timeline */}
            <div className="flex justify-between gap-1 mt-6 px-[2px]">
                {data.map((item, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === data.length - 1;
                    const shouldShowLabel = isFirst || isLast || (idx % showEvery === 0);

                    return (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                            <div className={cn(
                                "w-[1px] h-3 bg-ui-border transition-all duration-500",
                                shouldShowLabel ? "opacity-100" : "opacity-0"
                            )} />
                            <span className={cn(
                                "text-[8px] font-black uppercase tracking-tighter text-ui-muted transition-all duration-500 mt-2",
                                shouldShowLabel ? "opacity-40" : "opacity-0"
                            )}>
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            {/* Legend */}
            <div className="mt-5 flex items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-[4px] bg-black" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted">Success</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-[4px] bg-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted">Failed</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-[4px] bg-slate-200" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted">In Transit</span>
                </div>
            </div>
        </div>
    );
};

