import React from 'react';
import { Send, MessageSquare, Hash, MessageCircle, Bell, Globe, Activity, TrendingUp } from 'lucide-react';
import { UsageSparkline } from './UsageSparkline';

interface UsageCardProps {
    item: {
        channel_name: string;
        current_usage: number;
    };
    limit: number;
    title?: string;
    icon?: any;
}

export const UsageCard: React.FC<UsageCardProps> = ({ item, limit, title, icon: CustomIcon }) => {
    const getChannelIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('email')) return <Send className="w-4 h-4" />;
        if (n.includes('sms')) return <MessageSquare className="w-4 h-4" />;
        if (n.includes('slack')) return <Hash className="w-4 h-4" />;
        if (n.includes('whatsapp')) return <MessageCircle className="w-4 h-4" />;
        if (n.includes('push') || n.includes('app')) return <Bell className="w-4 h-4" />;
        if (n.includes('webhook')) return <Globe className="w-4 h-4" />;
        return <Activity className="w-4 h-4" />;
    };

    const percentage = limit > 0 ? Math.min(Math.round((item.current_usage / limit) * 100), 100) : 0;
    const isUnlimited = limit === -1;

    return (
        <div className="bg-ui-surface border border-ui-border rounded-[16px] p-7 relative overflow-hidden group shadow-sm flex flex-col min-h-[180px] transition-all hover:border-black/20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black/5 rounded-md flex items-center justify-center text-ui-text transition-transform group-hover:rotate-6">
                        {CustomIcon ? <CustomIcon className="w-4 h-4" /> : getChannelIcon(item.channel_name)}
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted opacity-80">
                        {title || item.channel_name}
                    </h3>
                </div>
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
                    <Activity className="w-3 h-3 opacity-40" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-end">
                <div className="flex items-baseline gap-2 mb-1">
                    <div className="text-4xl font-black tracking-tighter text-ui-text">
                        {item.current_usage.toLocaleString()}
                    </div>
                    {!isUnlimited && (
                        <div className="flex items-center gap-1 text-success">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-[10px] font-black">{percentage}%</span>
                        </div>
                    )}
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="text-[9px] font-black uppercase tracking-widest text-ui-muted opacity-30">
                        {isUnlimited ? 'Unlimited Units' : `of ${limit.toLocaleString()} units`}
                    </div>
                </div>
            </div>

            {/* Sparkline at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none">
                <UsageSparkline color="#000000" />
            </div>
        </div>
    );
};
