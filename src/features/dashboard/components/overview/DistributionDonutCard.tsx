import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface DistributionDonutCardProps {
    title: string;
    totalValue: string;
    totalLabel: string;
    data: {
        label: string;
        count: number;
        percentage: number;
        color: string;
    }[];
}

export const DistributionDonutCard: React.FC<DistributionDonutCardProps> = ({ title, totalValue, totalLabel, data }) => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    
    let cumulativeOffset = 0;

    return (
        <div className="bg-white border border-ui-border rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col h-full relative group">
            <div className="mb-8">
                <h3 className="text-[14px] font-bold text-ui-text tracking-tight">{title}</h3>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]">
                <svg className="w-48 h-48 transform -rotate-90 overflow-visible">
                    {/* Background Track */}
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        fill="none"
                        stroke="var(--ui-border)"
                        strokeOpacity="0.5"
                        strokeWidth="24"
                    />
                    
                    {/* Dynamic Segments */}
                    {data.length > 0 ? (
                        data.map((item, idx) => {
                            const segmentLength = (item.percentage / 100) * circumference;
                            const currentOffset = cumulativeOffset;
                            cumulativeOffset += segmentLength;
                            const isHovered = hoveredIdx === idx;

                            return (
                                <circle
                                    key={idx}
                                    cx="96"
                                    cy="96"
                                    r={radius}
                                    fill="none"
                                    stroke={item.color}
                                    strokeWidth={isHovered ? "32" : "24"}
                                    strokeDasharray={`${segmentLength} ${circumference}`}
                                    strokeDashoffset={-currentOffset}
                                    strokeLinecap="round"
                                    className="transition-all duration-300 ease-out cursor-pointer"
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                />
                            );
                        })
                    ) : (
                        <circle
                            cx="96"
                            cy="96"
                            r={radius}
                            fill="none"
                            stroke="var(--ui-border)"
                            strokeWidth="24"
                            strokeDasharray="1 10"
                            className="opacity-20"
                        />
                    )}
                </svg>

                {/* Center Content / Tooltip */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                    {hoveredIdx !== null ? (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-200">
                            <span className="text-4xl font-black tracking-tighter text-ui-text leading-none">
                                {data[hoveredIdx].count.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-text opacity-100 mt-2">
                                {data[hoveredIdx].label}
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black tracking-tighter text-ui-text leading-none">
                                {data.length > 0 ? totalValue : '0'}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted mt-2 opacity-40">
                                {data.length > 0 ? totalLabel : 'NO ACTIVITY'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 mt-8">
                {data.length > 0 ? (
                    data.map((item, idx) => (
                        <div 
                            key={idx} 
                            className={cn(
                                "flex items-center gap-2 transition-opacity",
                                hoveredIdx !== null && hoveredIdx !== idx ? "opacity-20" : "opacity-100"
                            )}
                        >
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-ui-text">{item.label}</span>
                        </div>
                    ))
                ) : (
                    <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-30 italic">
                        No delivery data available
                    </span>
                )}
            </div>
        </div>
    );
};


