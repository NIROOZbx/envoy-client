import React, { useRef, useState } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PulseChartCardProps {
    title: string;
    value: string;
    trend: number;
    tagline: string;
    icon?: any;
    trendData?: number[];
}

export const PulseChartCard: React.FC<PulseChartCardProps> = ({ title, value, trend, tagline, icon: Icon, trendData = [] }) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const width = 240;
    const height = 80;
    const max = Math.max(...trendData, 1000);
    const min = 0;
    const range = max - min;

    // Current point to display (hovered or latest)
    const activeIndex = hoverIndex !== null ? hoverIndex : trendData.length - 1;
    const activeValue = trendData[activeIndex] || 0;
    const displayValue = hoverIndex !== null ? `${activeValue}ms` : value;

    // Sparkline Logic for Smooth Area Chart
    const generatePath = (isArea: boolean) => {
        if (!trendData.length) return "";
        
        const points = trendData.map((v, i) => ({
            x: (i / (trendData.length - 1)) * width,
            y: height - ((v - min) / range) * height
        }));

        let d = `M ${points[0].x},${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            d += ` C ${cp1x},${p0.y} ${cp1x},${p1.y} ${p1.x},${p1.y}`;
        }

        if (isArea) {
            d += ` L ${width},${height} L 0,${height} Z`;
        }
        return d;
    };

    const getPointAt = (idx: number) => {
        if (idx < 0 || idx >= trendData.length) return null;
        return {
            x: (idx / (trendData.length - 1)) * width,
            y: height - ((trendData[idx] - min) / range) * height
        };
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!svgRef.current || trendData.length < 2) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const normalizedX = (x / rect.width) * width;
        const index = Math.round((normalizedX / width) * (trendData.length - 1));
        setHoverIndex(Math.min(Math.max(index, 0), trendData.length - 1));
    };

    const activePoint = getPointAt(activeIndex);

    return (
        <div className="bg-white border border-ui-border rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col h-full relative overflow-hidden group">
            <div className="flex justify-between items-start z-10 relative">
                <div className="space-y-1">
                    <h3 className="text-[14px] font-bold text-ui-text tracking-tight flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4 text-ui-muted" />}
                        {title}
                    </h3>
                    <p className="text-[11px] font-bold text-ui-muted opacity-40 leading-relaxed">
                        {tagline}
                    </p>
                </div>
                <button className="w-10 h-10 rounded-[12px] bg-[#F8F9FA] border border-ui-border flex items-center justify-center transition-all hover:bg-black hover:text-white shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative mt-4">
                {/* Smooth Area Chart with Interaction */}
                <div className="w-full h-[120px] relative px-2 cursor-crosshair">
                    <svg 
                        ref={svgRef}
                        viewBox={`0 0 ${width} 100`} 
                        className="w-full h-full overflow-visible"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F3F4F6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#F3F4F6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        
                        {/* Gradient Area */}
                        <path
                            d={generatePath(true)}
                            fill="url(#areaGradient)"
                            className="transition-all duration-300"
                        />
                        
                        {/* The Stroke Line */}
                        <path
                            d={generatePath(false)}
                            fill="none"
                            stroke="black"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-300"
                        />

                        {/* Interactive Marker */}
                        {activePoint && (
                            <g className="transition-all duration-200 ease-out">
                                <line 
                                    x1={activePoint.x} y1={activePoint.y} x2={activePoint.x} y2="100" 
                                    stroke="black" strokeWidth="1" strokeDasharray="4 4" opacity="0.2"
                                />
                                <circle
                                    cx={activePoint.x}
                                    cy={activePoint.y}
                                    r={hoverIndex !== null ? "6" : "5"}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth="2.5"
                                    className="shadow-xl"
                                />
                                {hoverIndex !== null && (
                                    <circle
                                        cx={activePoint.x}
                                        cy={activePoint.y}
                                        r="12"
                                        fill="black"
                                        className="opacity-[0.05] animate-pulse"
                                    />
                                )}
                            </g>
                        )}
                    </svg>
                </div>

                {/* Dynamic Value Overlay */}
                <div className="mt-6 flex flex-col items-center">
                    <div className="text-4xl font-black tracking-tighter text-ui-text transition-all">
                        {displayValue}
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 mt-1 text-[10px] font-black px-3 py-1 rounded-full transition-all",
                        trend < 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                        hoverIndex !== null && "opacity-0 scale-95"
                    )}>
                        {trend < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                        {Math.abs(trend)}% vs last period
                    </div>
                    {hoverIndex !== null && (
                        <div className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-40 animate-in fade-in slide-in-from-bottom-1 duration-300">
                            Point {activeIndex + 1} of {trendData.length}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
