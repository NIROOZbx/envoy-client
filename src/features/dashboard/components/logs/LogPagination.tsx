import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LogPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const LogPagination: React.FC<LogPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center gap-2">
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-11 h-11 border border-ui-border rounded-xl flex items-center justify-center hover:bg-black/5 disabled:opacity-20 disabled:pointer-events-none transition-all"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 text-[10px] font-black uppercase tracking-widest">
                Page {currentPage} <span className="opacity-30">of</span> {totalPages}
            </div>
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-11 h-11 border border-ui-border rounded-xl flex items-center justify-center hover:bg-black/5 disabled:opacity-20 disabled:pointer-events-none transition-all"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};
