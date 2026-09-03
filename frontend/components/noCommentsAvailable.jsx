"use client";

import { MessageCircleMore } from "lucide-react";

export default function NoComments() {
  return (
    <div className="flex justify-center gap-2 py-20">
      <div className="text-center">
        <MessageCircleMore className="size-8 text-gray-400 mx-auto" />
        <h2 className="text-base md:text-[18px] font-semibold text-gray-800 mt-4">
          No Comments Yet
        </h2>
      </div>
    </div>
  );
}
