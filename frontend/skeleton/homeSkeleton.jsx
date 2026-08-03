import React from "react";
import PostCardSkeleton from "./postCardSkeleton";

export default function HomeSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Home header skeleton */}
      <header className="flex items-center justify-between px-3 py-2 border-b border-neutral-300">
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="w-6 h-6 rounded bg-gray-200 animate-pulse" />
      </header>

      {/* Posts grid skeleton */}
      <div className="columns mx-auto md:columns-2 gap-1 sm:px-20 md:px-10 lg:px-20 lg:columns-1">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="break-inside-avoid mb-2">
            <PostCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
