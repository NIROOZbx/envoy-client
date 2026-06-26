import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useActivityLogs } from '../hooks/useActivityLogs';
import { LogFilters } from '../components/logs/LogFilters';
import { LogTable } from '../components/logs/LogTable';
import { LogPagination } from '../components/logs/LogPagination';
import { HeaderSkeleton, TableSkeleton } from '@/components/ui';

export const ActivityLogPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1');
    const channel = searchParams.get('channel') || 'all';
    const status = searchParams.get('status') || 'all';
    const provider = searchParams.get('provider') || '';

    const { data, isLoading } = useActivityLogs({
        page,
        channel,
        status,
        provider,
    });

    const handleFilterChange = (key: string, value: string) => {
        setSearchParams(prev => {
            prev.set(key, value);
            prev.set('page', '1');
            return prev;
        });
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams(prev => {
            prev.set('page', newPage.toString());
            return prev;
        });
    };

    if (isLoading) {
        return (
            <div className="max-w-full pb-32">
                <HeaderSkeleton />
                <TableSkeleton rows={10} cols={6} />
            </div>
        );
    }

    return (
        <div className="max-w-full pb-32">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
                <div className="flex items-end gap-6">
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-ui-text leading-[0.8]">Logs</h1>
                    <div className="flex flex-col gap-2 pb-1.5 translate-y-1">
                        <div className="flex items-center gap-2 px-3 py-1 bg-ui-text/5 border border-ui-border rounded-md">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-text">Real-time Stream</span>
                        </div>
                    </div>
                </div>
                
                <p className="text-ui-muted font-bold tracking-tight opacity-60 text-xs max-w-sm lg:text-right pb-1.5">
                    Architectural trace of every notification pulse across your infrastructure.
                </p>
            </div>

            <LogFilters
                channel={channel}
                status={status}
                provider={provider}
                onFilterChange={handleFilterChange}
            />

            <div className="mb-6 flex justify-end">
                <LogPagination
                    currentPage={page}
                    totalPages={data?.total_pages || 0}
                    onPageChange={handlePageChange}
                />
            </div>

            <LogTable
                logs={data?.logs || []}
                isLoading={isLoading}
                onClearFilters={() => setSearchParams({})}
            />
        </div>
    );
};
