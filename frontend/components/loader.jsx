"use client";
import React from "react";

export default function Loader({
  size = "md",
  text1 = "Please wait...",
  text2 = "",
}) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      />
      <div className="text-center ml-3 animate-pulse">
        <p className="text-gray-700 font-medium">{text1}</p>
        <p className="text-gray-500 text-sm">{text2}</p>
      </div>
    </div>
  );
}
