import React from 'react';
import { cn } from '@/lib/utils';

interface BarSegmentProps {
    delivered: number;
    failed: number;
    processing: number;
    unused: number;
    maxValue: number;
    label: string;
    isActive?: boolean;
}

export const BarSegment: React.FC<BarSegmentProps> = ({ 
    delivered, failed, processing, unused, label 
}) => {
    return (
        <div className="flex-1 flex flex-col items-center group relative h-full justify-end z-10 hover:z-50 transition-all">
            {/* Architectural Flex Stack */}
            <div className="w-full flex flex-col-reverse gap-1 items-center h-full relative group-hover:scale-x-110 transition-transform duration-500">
                {/* Delivered - Solid Black */}
                {delivered > 0 && (
                    <div 
                        className="w-full bg-black rounded-full shadow-sm group-hover:shadow-lg transition-all duration-300"
                        style={{ flexGrow: delivered }}
                    />
                )}
                {/* Failed - Slate Gray */}
                {failed > 0 && (
                    <div 
                        className="w-full bg-slate-400 rounded-full shadow-sm group-hover:shadow-lg transition-all duration-300"
                        style={{ flexGrow: failed }}
                    />
                )}
                {/* Processing - Silver/Light Gray */}
                {processing > 0 && (
                    <div 
                        className="w-full bg-slate-200 rounded-full shadow-sm group-hover:shadow-lg transition-all duration-300"
                        style={{ flexGrow: processing }}
                    />
                )}
                
                <div style={{ flexGrow: unused }} className="w-full" />
                
                {/* Subtle Track */}
                <div className="absolute inset-0 bg-slate-50 rounded-full -z-10" />
            </div>

            {/* Architectural Tooltip */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 bg-white border border-ui-border rounded-[16px] p-4 shadow-[0_15px_35px_rgba(0,0,0,0.1)] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-30 min-w-[170px]">
                <div className="flex justify-between items-center mb-3 border-b border-ui-border pb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted">{label}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
                <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-black" />
                            <span className="text-[11px] font-bold text-ui-text">Delivered</span>
                        </div>
                        <span className="text-[11px] font-black text-ui-text">{delivered}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400" />
                            <span className="text-[11px] font-bold text-ui-text">Failed</span>
                        </div>
                        <span className="text-[11px] font-black text-slate-500">{failed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-200" />
                            <span className="text-[11px] font-bold text-ui-text">In Transit</span>
                        </div>
                        <span className="text-[11px] font-black text-slate-400">{processing}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
