"use client";
import dynamic from "next/dynamic";
import { VirtuosoGrid } from "react-virtuoso";
import PostCardSkeleton from "@/skeleton/postCardSkeleton.jsx";
const PostCard = dynamic(() => import("@/components/postCard.jsx"), {
  loading: () => <PostCardSkeleton />,
});
import { FaUniversity, FaFacebookMessenger } from "react-icons/fa";
import { useMemo } from 'react';

export default function PostList({ posts }) {  
  const memoizedPosts = useMemo(() => posts, [posts]);
  
  return (
    <div className="flex flex-col">
      {/* home header */}
      <header className="sm:hidden lg:block flex items-center justify-between px-3 py-2 sm:border-b-4">
        <div className="flex gap-3 items-center">
          <FaUniversity className="text-[30px] text-blue-700" />
          <h1 className="text-[16px] font-semibold">Campusforum</h1>
        </div>
        <FaFacebookMessenger size={22} className="lg:hidden" />
      </header>

      <VirtuosoGrid
        style={{ height: "100vh" }}
        totalCount={memoizedPosts?.length}
        itemContent={(index) => (
          <PostCard key={memoizedPosts[index]._id} post={memoizedPosts[index]} />
        )}
        listClassName="grid grid-cols-1" 
      />
    </div>
  );
}
