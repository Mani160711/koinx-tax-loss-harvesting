import React from 'react';

/**
 * SkeletonLoader Component
 * Renders high-fidelity shimmering skeleton structures matching dashboard layout.
 */
const SkeletonLoader = React.memo(() => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-6 space-y-6">
      
      {/* 1. Collapsible Info Panel Skeleton */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 animate-pulse flex items-center justify-between">
        <div className="flex items-center gap-3.5 w-full">
          <div className="w-9 h-9 rounded-full bg-slate-200/80 flex-shrink-0" />
          <div className="space-y-2 w-2/3">
            <div className="h-4 bg-slate-200/80 rounded w-1/2" />
            <div className="h-3 bg-slate-200/60 rounded w-3/4" />
          </div>
        </div>
        <div className="w-5 h-5 rounded bg-slate-200/80" />
      </div>

      {/* 2. Summary Cards Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pre-Harvest Skeleton */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm animate-pulse space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="h-4 bg-slate-200/80 rounded w-1/3" />
            <div className="h-5 bg-slate-200/60 rounded w-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
                <div className="h-4 bg-slate-200/80 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200/60 rounded w-full" />
                  <div className="h-3 bg-slate-200/60 rounded w-full" />
                  <div className="h-3.5 bg-slate-200/80 rounded w-3/4 pt-1" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
            <div className="h-5 bg-slate-200/85 rounded w-1/3" />
            <div className="h-7 bg-slate-200/85 rounded w-28" />
          </div>
        </div>

        {/* After-Harvest Skeleton */}
        <div className="bg-slate-200/60 border border-slate-200 rounded-2xl p-6 shadow-sm animate-pulse space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="h-4 bg-slate-200/85 rounded w-1/3" />
            <div className="h-5 bg-slate-200/70 rounded w-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-slate-200/80 p-4 rounded-xl space-y-3">
                <div className="h-4 bg-slate-200/85 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200/70 rounded w-full" />
                  <div className="h-3 bg-slate-200/70 rounded w-full" />
                  <div className="h-3.5 bg-slate-200/85 rounded w-3/4 pt-1" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-200 p-4 rounded-xl flex justify-between items-center">
            <div className="h-5 bg-slate-200/90 rounded w-1/3" />
            <div className="h-7 bg-slate-200/90 rounded w-28" />
          </div>
        </div>
      </div>

      {/* 3. Table Skeleton */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-md overflow-hidden animate-pulse">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="space-y-2 w-1/3">
            <div className="h-4 bg-slate-200/80 rounded w-2/3" />
            <div className="h-3 bg-slate-200/60 rounded w-full" />
          </div>
          <div className="h-6 bg-slate-200/70 rounded w-28" />
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-7 gap-4 pb-2 border-b border-slate-100">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-3 bg-slate-200/80 rounded" />
            ))}
          </div>
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="grid grid-cols-7 gap-4 py-2">
              <div className="h-5 bg-slate-200/60 rounded w-6 justify-self-center" />
              <div className="h-8 bg-slate-200/60 rounded w-4/5" />
              <div className="h-6 bg-slate-200/60 rounded w-2/3" />
              <div className="h-5 bg-slate-200/70 rounded w-1/2" />
              <div className="h-8 bg-slate-200/60 rounded w-4/5" />
              <div className="h-8 bg-slate-200/60 rounded w-4/5" />
              <div className="h-5 bg-slate-200/60 rounded w-10 justify-self-center" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

SkeletonLoader.displayName = 'SkeletonLoader';

export default SkeletonLoader;
