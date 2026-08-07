"use client";
import dynamic from "next/dynamic";
import HomeSkeleton from "@/skeleton/homeSkeleton";
const PostList = dynamic(()=> import("@/ui/postList"),{
  loading: () => <HomeSkeleton />,
});
import { useContext, useEffect } from "react";
import { PostContext } from "@/app/context/postContext";

export default function HomePage() {
  const { homeFeed, posts } = useContext(PostContext);

  useEffect(()=>{
    homeFeed()
  }, []);

  return (
    <>
      <PostList posts={posts} />
    </>
  );
}

{
  /* <div className="grid sm:px-2 sm:grid-cols-2 lg:grid-cols-none lg:flex lg:flex-wrap lg:justify-center gap-2">
  {Array.isArray(postData?.posts) &&
    postData?.posts.map((post) => (
      <PostCard
        key={post._id}
        post={post}
        comments={
          postData?.comments &&
          postData?.comments.filter((comment) => comment?.post === post._id)
        }
      />
    ))}
</div> */
}
