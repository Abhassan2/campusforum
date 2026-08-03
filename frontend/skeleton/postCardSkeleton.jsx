import React from "react";

export default function PostCardSkeleton() {
  return (
    <div
      className="flex flex-col animate-pulse"
    >
      {/* Post header skeleton */}
      <div className="lg:hidden p-2 border-b border-neutral-300">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
          </div>
        </div>
      </div>

      {/* Media skeleton */}
      <div className="w-full mx-auto max-h-90 lg:rounded-xl lg:min-w-130 lg:h-130 bg-gray-200" />

      {/* Content section skeleton */}
      <div
        className="flex flex-col border-t p-2 lg:py-4 lg:border lg:border-l-0 lg:pl-4 lg:rounded-br-xl lg:rounded-tr-xl lg:min-w-90 border-neutral-300"
      >
        {/* Desktop header skeleton */}
        <div className="hidden lg:block p-2 border-b border-neutral-300 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>

        {/* Mobile actions skeleton */}
        <div className="lg:hidden flex mb-3">
          <div className="h-80 w-80 bg-gray-200 rounded " />
        </div>

        {/* Caption skeleton */}
        <div className="text-[14px] md:text-[16px] lg:px-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>

        {/* Desktop actions skeleton */}
        <div className="hidden lg:flex gap-4 mt-auto pt-4 pl-4">
          <div className="h-5 bg-gray-200 rounded w-8" />
          <div className="h-5 bg-gray-200 rounded w-8" />
          <div className="h-5 bg-gray-200 rounded w-8" />
        </div>
      </div>
    </div>
  );
}
