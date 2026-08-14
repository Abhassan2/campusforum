import React from 'react'

export default function ProfileLoading() {
  return (
    <div className="lg:px-4">
      {/* Profile header skeleton */}
      <header className="flex justify-between items-center bg-white px-3 py-2 border-b-2 mb-2 border-neutral-300">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-32" />
        </div>
        <div className="lg:hidden animate-pulse">
          <div className="h-8 w-8 bg-gray-200 rounded" />
        </div>
      </header>

      {/* Profile body skeleton */}
      <div className="p-2 animate-pulse">
        {/* Profile info section */}
        <div className="flex flex-col gap-2 border-b-2 border-neutral-300 pb-5">
          <div className="flex-1 flex gap-4 md:gap-5">
            {/* Profile picture skeleton */}
            <div className="w-16 h-16 md:w-25 md:h-25 rounded-full bg-gray-200 shrink-0" />
            
            <div className="md:mt-5 flex-1">
              {/* Name skeleton */}
              <div className="mb-4">
                <div className="h-5 bg-gray-200 rounded w-40 md:w-48" />
              </div>

              {/* Stats section skeleton */}
              <div className="flex gap-4 md:gap-6">
                {/* Posts count */}
                <div className="flex flex-col space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-12" />
                  <div className="h-3 bg-gray-200 rounded w-10" />
                </div>
                {/* Followers count */}
                <div className="flex flex-col space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-12" />
                  <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
                {/* Following count */}
                <div className="flex flex-col space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-12" />
                  <div className="h-3 bg-gray-200 rounded w-14" />
                </div>
              </div>
            </div>
          </div>

          {/* Bio and button skeleton */}
          <div className="mx-3 max-w-200">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
            <div className="h-8 bg-gray-200 rounded w-28 mt-6" />
          </div>
        </div>

        {/* Posts grid skeleton */}
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-0.5">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full aspect-square bg-gray-200 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
