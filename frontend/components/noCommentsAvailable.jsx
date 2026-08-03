"use client";
import { FaRegCommentDots } from "react-icons/fa";

export default function NoComments() {
  return (
    <div className="flex justify-center gap-2 py-20">
      <div className="text-center">
        <FaRegCommentDots className="text-5xl text-gray-400 mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          No Comments Yet
        </h2>
      </div>
    </div>
  );
}
