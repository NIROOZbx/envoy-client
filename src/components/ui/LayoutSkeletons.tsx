import { Skeleton } from './Skeleton';
import { cn } from '@/lib/utils';

export const HeaderSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-in fade-in duration-500", className)}>
    <div className="space-y-4">
      <Skeleton className="h-16 w-64 md:w-96" />
      <Skeleton className="h-4 w-48 md:w-64 opacity-50" />
    </div>
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-32 rounded-full" />
    </div>
  </div>
);

export const StatsGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    {[...Array(count)].map((_, i) => (
      <Skeleton key={i} className="h-28 w-full rounded-2xl" />
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5, cols = 5 }: { rows?: number, cols?: number }) => (
  <div className="bg-white border border-ui-border rounded-[32px] overflow-hidden shadow-sm">
    <div className="p-6 border-b border-ui-border flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-32" />
    </div>
    <div className="p-0">
      <table className="w-full">
        <thead>
          <tr className="bg-black/[0.01]">
            {[...Array(cols)].map((_, i) => (
              <th key={i} className="py-4 px-6"><Skeleton className="h-3 w-20" /></th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ui-border">
          {[...Array(rows)].map((_, i) => (
            <tr key={i}>
              {[...Array(cols)].map((_, j) => (
                <td key={j} className="py-6 px-6"><Skeleton className="h-4 w-full max-w-[120px]" /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const CardGridSkeleton = ({ count = 6, height = "h-48" }: { count?: number, height?: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(count)].map((_, i) => (
      <div key={i} className={cn("bg-white border border-ui-border rounded-2xl p-6 space-y-4", height)}>
        <div className="flex items-center justify-between">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="pt-4 border-t border-ui-border/50">
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const SearchBarSkeleton = () => (
  <Skeleton className="h-14 w-full rounded-2xl mb-10" />
);

export const OverviewSkeleton = () => (
  <div className="max-w-[1600px] mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-10">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-10 w-48 rounded-full" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Skeleton className="lg:col-span-2 h-[380px] rounded-[32px]" />
      <Skeleton className="h-[380px] rounded-[32px]" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Skeleton className="h-[400px] rounded-[32px]" />
      <Skeleton className="h-[400px] rounded-[32px]" />
    </div>
    <Skeleton className="h-[300px] rounded-[32px]" />
    <Skeleton className="h-[400px] rounded-[32px]" />
  </div>
);

export const IntegrationSkeleton = () => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <Skeleton className="h-28 w-full rounded-lg" />
    <div className="space-y-4">
      <Skeleton className="h-4 w-40" />
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  </div>
);

export const ApiKeySkeleton = () => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <Skeleton className="h-28 w-full rounded-lg" />
    <div className="space-y-4">
      <Skeleton className="h-4 w-40" />
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-lg" />
      ))}
    </div>
  </div>
);

export const BillingSkeleton = () => (
  <div className="space-y-20 animate-in fade-in duration-500">
    <div>
      <Skeleton className="h-4 w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    </div>
    <div>
      <div className="flex flex-col items-center mb-16 space-y-4">
        <Skeleton className="h-12 w-80" />
        <Skeleton className="h-4 w-64 opacity-50" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[500px] w-full rounded-3xl" />
        ))}
      </div>
    </div>
  </div>
);
