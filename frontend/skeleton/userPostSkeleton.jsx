import React from 'react'

export default function UserPostSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-busy="true">
      <div className="w-full h-34 sm:h-72 bg-gray-200 rounded" />
      {/* <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div> */}
      {/* <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-3 bg-gray-200 rounded col-span-2" />
        <div className="h-3 bg-gray-200 rounded" />
      </div> */}
    </div>
  )
}
