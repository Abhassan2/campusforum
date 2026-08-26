"use client";
import React from "react";

export default function Loader({ size = "md" }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-9 h-9 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center">
        <div
        className={`${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin`}
        />
    </div>
  );
}
