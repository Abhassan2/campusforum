"use client";
import dynamic from "next/dynamic";
import { VirtuosoGrid } from "react-virtuoso";
import PostCardSkeleton from "@/skeleton/postCardSkeleton";
const PostCard = dynamic(() => import("@/components/PostCard"), {
  loading: () => <PostCardSkeleton />,
});
import { useMemo } from 'react';

export default function PostList({ posts }) {  
  const memoizedPosts = useMemo(() => posts, [posts]);
  
  return (
    <div className="flex flex-col">
      {/* home header */}
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
