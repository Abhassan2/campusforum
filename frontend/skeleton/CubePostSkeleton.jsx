import React from 'react'

export default function UserPostSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-busy="true">
      <div className="w-full h-34 sm:h-72 bg-gray-200 rounded" />
    </div>
  )
}
