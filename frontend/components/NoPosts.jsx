"use client";
import { FaFolderOpen } from "react-icons/fa";

export default function NoPosts() {
  return (
    <>
      <div className="h-[50vh] flex flex-col justify-center items-center">
        <FaFolderOpen className="text-4xl sm:text-5xl text-gray-400" />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            No Posts Yet
        </h2>       
      </div>
    </>
  );
}
