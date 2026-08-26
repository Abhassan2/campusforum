import React from 'react'

export default function Loading() {

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`w-9 h-9 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      />
      <div className="text-center ml-3 animate-pulse">
        <p className="text-gray-700 font-medium">Please wait...</p>
      </div>
    </div>
  );
}

