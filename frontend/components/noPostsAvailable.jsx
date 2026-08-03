"use client";
import { FaFolderOpen } from "react-icons/fa";

export default function NoPosts() {
  return (
    <div className="flex justify-center gap-2">
      <div className="py-30">
        <FaFolderOpen className="text-5xl text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Posts Yet
        </h2>       
      </div>
    </div>
  );
}
