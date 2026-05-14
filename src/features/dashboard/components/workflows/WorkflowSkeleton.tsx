import { Skeleton } from '@/components/ui';

export const WorkflowCardSkeleton = () => (
  <div className="bg-ui-surface border border-ui-border rounded-lg p-6 shadow-sm h-64 flex flex-col">
    <div className="flex items-start justify-between mb-6">
      <Skeleton className="w-12 h-12 rounded-lg" />
      <Skeleton className="w-16 h-5 rounded-full" />
    </div>
    <div className="space-y-3 flex-1">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
    <div className="mt-auto flex items-center justify-between pt-4 border-t border-ui-border/50">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  </div>
);

export const WorkflowDetailsSkeleton = () => (
  <div className="max-w-6xl mx-auto pb-24 animate-in fade-in duration-500">
    {/* Header Bar Skeleton */}
    <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
        <div className="bg-ui-surface border border-ui-border rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-ui-border bg-ui-muted/5">
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    </div>

    {/* Channels Panel Skeleton */}
    <div className="mt-8">
      <div className="bg-ui-surface border border-ui-border rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-ui-border bg-ui-muted/5 flex items-center justify-between">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const WorkflowsPageSkeleton = () => (
  <div className="max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
      <Skeleton className="h-20 w-80" />
      <div className="flex items-end gap-6">
        <Skeleton className="h-4 w-48 hidden md:block" />
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-28 w-full rounded-lg" />
      ))}
    </div>

    <Skeleton className="h-14 w-full rounded-lg mb-10" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <WorkflowCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
