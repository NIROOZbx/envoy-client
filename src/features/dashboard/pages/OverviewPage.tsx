import React, { useState, useMemo } from 'react';
import { AnalyticsHeroCard } from '../components/overview/AnalyticsHeroCard';
import { PulseChartCard } from '../components/overview/PulseChartCard';
import { DistributionDonutCard } from '../components/overview/DistributionDonutCard';
import { Zap, ChevronDown, Calendar, Send, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { subDays, subMonths, startOfDay, format, endOfDay } from 'date-fns';
import { useAnalytics } from '../hooks/useAnalytics';
import { ProviderUsageCard } from '../components/overview/ProviderUsageCard';
import { ActivityWaveform } from '../components/overview/ActivityWaveform';
import { ProviderHealthTable } from '../components/overview/ProviderHealthTable';
import { cn } from '@/lib/utils';
import { OverviewSkeleton } from '@/components/ui';

const getDateRangeParams = (range: string) => {
    const end = new Date();
    let start = new Date();
    let groupBy = 'day';

    switch (range) {
        case 'Today':
            start = startOfDay(new Date());
            groupBy = 'hour';
            break;
        case 'Last 7 Days':
            start = startOfDay(subDays(new Date(), 6));
            groupBy = 'day';
            break;
        case 'Last 30 Days':
            start = startOfDay(subDays(new Date(), 29));
            groupBy = 'day';
            break;
        case 'Last 3 Months':
            start = startOfDay(subDays(new Date(), 90));
            groupBy = 'week';
            break;
        case 'This Year':
            start = new Date(new Date().getFullYear(), 0, 1);
            groupBy = 'month';
            break;
    }

    return {
        start: start.toISOString(),
        end: end.toISOString(),
        group_by: groupBy,
    };
};

export const DashboardOverviewPage: React.FC = () => {
    const [dateRange, setDateRange] = useState('Last 30 Days');
    
    const params = useMemo(() => getDateRangeParams(dateRange), [dateRange]);
    const { data: analytics, isLoading, isError, error, refetch } = useAnalytics(params);

    if (isLoading) {
        return <OverviewSkeleton />;
    }

    if (isError || !analytics) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="max-w-md w-full p-10 bg-white border border-ui-border rounded-[32px] text-center shadow-xl">
                    <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-2">Sync Interrupted</h2>
                    <p className="text-sm text-ui-muted font-bold mb-8">
                        {error instanceof Error ? error.message : "We couldn't connect to the analytics engine."}
                    </p>
                    <button 
                        onClick={() => refetch()}
                        className="w-full py-4 bg-black text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-black/90 transition-all shadow-lg"
                    >
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    const { aggregate, channels, providers, health, time_series } = analytics;
    const mostUsedProviderCount = providers.find(p => p.name.toLowerCase() === aggregate.most_used_provider?.toLowerCase())?.count || 0;

    const donutData = Object.entries(channels).map(([label, count], idx) => ({
        label: label.toUpperCase(),
        count: count,
        percentage: (count / Math.max(aggregate.total_sent, 1)) * 100,
        color: idx === 0 ? 'var(--black)' : idx === 1 ? 'var(--ui-muted-subtle)' : 'var(--ui-border)'
    }));

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-6">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase">System Overview</h1>
                <div className="relative group w-full sm:w-auto">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-ui-text border border-ui-border hover:border-black/20 transition-all shadow-sm">
                        <Calendar className="w-4 h-4 opacity-40" />
                        {dateRange}
                        <ChevronDown className="w-4 h-4 ml-2 opacity-40" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-ui-border rounded-[16px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                        {['Today', 'Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'This Year'].map(range => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className="w-full text-left px-5 py-3 text-[11px] font-black uppercase tracking-widest text-ui-muted hover:bg-black/5 hover:text-black transition-colors"
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <AnalyticsHeroCard
                        title="Total Notifications"
                        value={aggregate.total_sent.toLocaleString()}
                        tagline={`Primary: ${aggregate.most_used_channel || 'N/A'} • Leading Provider: ${aggregate.most_used_provider || 'N/A'}`}
                        metrics={[
                            { 
                                label: 'Sent', 
                                value: aggregate.total_sent.toLocaleString(), 
                                trend: aggregate.trends['sent'] || 0, 
                                icon: Send,
                                description: 'Outbound traffic',
                                color: 'bg-black', 
                                bgClass: 'bg-gradient-to-b from-white to-black/[0.03]',
                                trendColor: (aggregate.trends['sent'] || 0) >= 0 ? 'success' : 'destructive'
                            },
                            { 
                                label: 'Delivered', 
                                value: aggregate.total_delivered.toLocaleString(), 
                                trend: aggregate.trends['delivered'] || 0, 
                                icon: CheckCircle2,
                                description: 'Confirmed success',
                                color: 'bg-success', 
                                bgClass: 'bg-gradient-to-b from-white to-success/10',
                                trendColor: (aggregate.trends['delivered'] || 0) >= 0 ? 'success' : 'destructive'
                            },
                            { 
                                label: 'Failed', 
                                value: aggregate.total_failed.toLocaleString(), 
                                trend: aggregate.trends['failed'] || 0, 
                                icon: XCircle,
                                description: 'Processing errors',
                                color: 'bg-destructive', 
                                bgClass: 'bg-gradient-to-b from-white to-destructive/10',
                                trendColor: (aggregate.trends['failed'] || 0) <= 0 ? 'success' : 'destructive'
                            },
                            { 
                                label: 'Bounced', 
                                value: aggregate.total_bounced.toLocaleString(), 
                                trend: aggregate.trends['bounced'] || 0, 
                                icon: AlertCircle,
                                description: 'Invalid recipients',
                                color: 'bg-warning', 
                                bgClass: 'bg-gradient-to-b from-white to-warning/10',
                                trendColor: (aggregate.trends['bounced'] || 0) <= 0 ? 'success' : 'destructive'
                            },
                        ]}
                    />
                </div>
                <div>
                    <PulseChartCard
                        title="Average Latency"
                        value={`${health.average_latency_ms}ms`}
                        trend={-8}
                        tagline={`Most recent via ${aggregate.most_recent_provider || 'N/A'}`}
                        icon={Zap}
                        trendData={health.latency_trend}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DistributionDonutCard
                    title="Channel Distribution"
                    totalValue={aggregate.total_sent > 1000 ? (aggregate.total_sent / 1000).toFixed(1) + 'K' : aggregate.total_sent.toString()}
                    totalLabel="Total Units"
                    data={donutData.length > 0 ? donutData : [{ label: 'NONE', count: 0, percentage: 100, color: 'var(--ui-border)' }]}
                />
                <ProviderUsageCard 
                    title="Infrastructure Distribution"
                    providers={providers}
                />
            </div>

            <ActivityWaveform
                title="Global Delivery Activity"
                timeSeries={time_series}
                params={params}
            />

            <ProviderHealthTable
                health={health}
                aggregate={aggregate}
                providers={providers}
            />
        </div>
    );
};
