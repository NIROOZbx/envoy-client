import React, { useMemo } from 'react';
import { format, startOfWeek, addDays, addHours, addMonths } from 'date-fns';
import { ActivityBarCard } from './ActivityBarCard';

interface ActivityWaveformProps {
    timeSeries: any[];
    params: {
        start: string;
        end: string;
        group_by: string;
    };
    title: string;
}

export const ActivityWaveform: React.FC<ActivityWaveformProps> = ({ timeSeries, params, title }) => {
    const paddedData = useMemo(() => {
        const startDate = new Date(params.start);
        const endDate = new Date(params.end);
        
        let intervalPoints: Date[] = [];
        let labelFormat = 'dd MMM';

        if (params.group_by === 'hour') {
            intervalPoints = Array.from({ length: 24 }).map((_, i) => {
                const d = new Date(startDate);
                d.setHours(i, 0, 0, 0);
                return d;
            });
            labelFormat = 'HH:mm';
        } else if (params.group_by === 'day') {
            const days = Math.max(7, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
            intervalPoints = Array.from({ length: days }).map((_, i) => {
                const d = new Date(startDate);
                d.setDate(d.getDate() + i);
                return d;
            });
        } else if (params.group_by === 'week') {
            const weeks = 13;
            // Snap to Monday to match backend date_trunc('week')
            const firstMonday = startOfWeek(startDate, { weekStartsOn: 1 });
            intervalPoints = Array.from({ length: weeks }).map((_, i) => {
                const d = new Date(firstMonday);
                d.setDate(d.getDate() + (i * 7));
                return d;
            });
            // The backend returns "02 Jan" for weeks (dd MMM)
            labelFormat = 'dd MMM'; 
        } else if (params.group_by === 'month') {
            intervalPoints = Array.from({ length: 12 }).map((_, i) => {
                const d = new Date(startDate.getFullYear(), i, 1);
                return d;
            });
            labelFormat = 'MMM yyyy'; // Correct date-fns format for "Jan 2026"
        }

        const maxVal = Math.max(...timeSeries.map(ts => ts.sent_count + ts.delivered_count + ts.failed_count), 1);

        return intervalPoints.map((date, _) => {
            const label = format(date, labelFormat);
            const nextDate = 
                params.group_by === 'hour' ? addHours(date, 1) :
                params.group_by === 'day' ? addDays(date, 1) :
                params.group_by === 'week' ? addDays(date, 7) :
                addMonths(date, 1);

            // Aggregate all points that fall within this bucket
            const matches = timeSeries.filter(ts => {
                let tsDate: Date;
                
                if (params.group_by === 'hour') {
                    // Label is HH:mm from backend (assumed UTC)
                    // We need to be careful: HH:mm could be from 'today' or 'yesterday' UTC 
                    // depending on the local offset.
                    const [h, m] = ts.label.split(':');
                    const localDay = format(new Date(), 'yyyy-MM-dd');
                    tsDate = new Date(`${localDay}T${h}:${m}:00Z`);
                    
                    // If the resulting date is too far from our range, it might be the 'other' UTC day
                    if (Math.abs(tsDate.getTime() - date.getTime()) > 1000 * 60 * 60 * 12) {
                        const yesterday = format(addDays(new Date(), -1), 'yyyy-MM-dd');
                        const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
                        const dYesterday = new Date(`${yesterday}T${h}:${m}:00Z`);
                        const dTomorrow = new Date(`${tomorrow}T${h}:${m}:00Z`);
                        
                        if (Math.abs(dYesterday.getTime() - date.getTime()) < Math.abs(tsDate.getTime() - date.getTime())) {
                            tsDate = dYesterday;
                        } else if (Math.abs(dTomorrow.getTime() - date.getTime()) < Math.abs(tsDate.getTime() - date.getTime())) {
                            tsDate = dTomorrow;
                        }
                    }
                } else if (params.group_by === 'month') {
                    tsDate = new Date(ts.label);
                } else {
                    // Label is dd MMM (e.g., 28 Apr) - Treat as UTC
                    tsDate = new Date(`${ts.label} ${new Date().getFullYear()} 00:00:00Z`);
                }

                if (isNaN(tsDate.getTime())) return ts.label === label;
                
                // For hour, we compare the exact moment
                if (params.group_by === 'hour') {
                    return tsDate >= date && tsDate < nextDate;
                }

                // For day/week/month, we compare normalized local days
                const d1 = new Date(tsDate);
                d1.setHours(0,0,0,0);
                const d2 = new Date(date);
                d2.setHours(0,0,0,0);
                const d3 = new Date(nextDate);
                d3.setHours(0,0,0,0);
                return d1 >= d2 && d1 < d3;
            });
            
            const delivered = matches.reduce((acc, m) => acc + (m.delivered_count || 0), 0);
            const failed = matches.reduce((acc, m) => acc + (m.failed_count || 0), 0);
            const sent = matches.reduce((acc, m) => acc + (m.sent_count || 0), 0);
            const total = delivered + failed + sent;

            return {
                label,
                value: total,
                maxValue: maxVal,
                deliveredValue: delivered,
                failedValue: failed
            };
        });
    }, [timeSeries, params]);

    return (
        <div className="bg-white border border-ui-border rounded-[24px] p-8 shadow-sm">
            <ActivityBarCard
                title={title}
                data={paddedData}
            />
        </div>
    );
};
