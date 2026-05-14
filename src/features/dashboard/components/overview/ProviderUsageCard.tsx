import React from 'react';

interface ProviderUsageCardProps {
    title: string;
    providers: {
        name: string;
        count: number;
    }[];
}

export const ProviderUsageCard: React.FC<ProviderUsageCardProps> = ({ title, providers }) => {
    const total = providers.reduce((acc, curr) => acc + curr.count, 0) || 1;

    return (
        <div className="bg-white border border-ui-border rounded-[24px] p-8 shadow-sm flex flex-col h-full">
            <div className="mb-8">
                <h3 className="text-[14px] font-bold text-ui-text tracking-tight">{title}</h3>
            </div>

            <div className="flex-1 space-y-6">
                {providers.length > 0 ? (
                    providers.sort((a, b) => b.count - a.count).map((provider, idx) => {
                        const percentage = (provider.count / total) * 100;
                        
                        return (
                            <div key={idx} className="space-y-2 group">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-ui-text">
                                        {provider.name}
                                    </span>
                                    <span className="text-[12px] font-black text-ui-text">
                                        {provider.count.toLocaleString()}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-black transition-all duration-1000 ease-out rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-full flex items-center justify-center py-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-30 italic text-center">
                            No provider data recorded
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-ui-border flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-ui-muted opacity-40">Diversity Score</span>
                <span className="text-[12px] font-black text-ui-text">
                    {providers.length} Active Node{providers.length !== 1 ? 's' : ''}
                </span>
            </div>
        </div>
    );
};
