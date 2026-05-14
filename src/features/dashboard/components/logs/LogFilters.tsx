import React from 'react';
import { Search, Globe, Send, MessageSquare, Bell, MessageCircle, Layout } from 'lucide-react';
import { Dropdown } from '@/components/ui';

export const LOG_CHANNELS = [
    { id: 'all', label: 'All Activity', icon: Globe },
    { id: 'email', label: 'Email', icon: Send },
    { id: 'sms', label: 'SMS', icon: MessageSquare },
    { id: 'push', label: 'Push', icon: Bell },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'webhook', label: 'Webhooks', icon: Globe },
    { id: 'in_app', label: 'In-App', icon: Layout },
];

export const LOG_STATUSES = [
    { id: 'all', label: 'Any Status' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'failed', label: 'Failed' },
    { id: 'processing', label: 'Processing' },
    { id: 'sent', label: 'Sent' },
];

interface LogFiltersProps {
    channel: string;
    status: string;
    provider: string;
    onFilterChange: (key: string, value: string) => void;
}

export const LogFilters: React.FC<LogFiltersProps> = ({ channel, status, provider, onFilterChange }) => {
    return (
        <div className="flex flex-col gap-8 mb-12">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 max-w-3xl">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-muted opacity-40 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                        <input 
                            type="text"
                            placeholder="Search by provider message ID..."
                            value={provider}
                            onChange={(e) => onFilterChange('provider', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-ui-surface border border-ui-border rounded-2xl text-[11px] font-black uppercase tracking-widest placeholder:text-ui-muted-subtle/50 focus:outline-none focus:border-ui-text transition-all shadow-sm"
                        />
                    </div>

                    <Dropdown 
                        options={LOG_CHANNELS}
                        value={channel}
                        onChange={(val) => onFilterChange('channel', val)}
                        className="min-w-[180px]"
                        placeholder="Select Channel"
                    />

                    <Dropdown 
                        options={LOG_STATUSES}
                        value={status}
                        onChange={(val) => onFilterChange('status', val)}
                        className="min-w-[180px]"
                        placeholder="Select Status"
                    />
                </div>
            </div>
        </div>
    );
};
