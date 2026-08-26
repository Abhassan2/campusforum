import PostCardSkeleton from "@/skeleton/postCardSkeleton";
import PostCard from "@/components/PostCard";
import { Suspense } from "react";

export default function PostList({ posts }) {

  return (
    <div className="flex flex-col">
      <div className="grid sm:px-2 sm:grid-cols-2 lg:grid-cols-none lg:flex lg:flex-wrap lg:justify-center gap-2">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Suspense key={post._id} fallback={ <PostCardSkeleton /> }>
              <PostCard
                post={post}
              />
            </Suspense>
          ))}
      </div>
    </div>
  );
}


{/* <VirtuosoGrid
        style={{ height: "100vh" }}
        totalCount={memoizedPosts?.length}
        itemContent={(index) => (
          <PostCard key={memoizedPosts[index]._id} post={memoizedPosts[index]} />
        )}
        listClassName="grid grid-cols-1" 
      /> */}