"use client";
import dynamic from "next/dynamic";
import HomeSkeleton from "@/skeleton/homeSkeleton";
const PostList = dynamic(() => import("@/ui/PostList"));
import { useContext, useEffect } from "react";
import { PostContext } from "@/app/context/postContext";
import { FaUniversity, FaFacebookMessenger } from "react-icons/fa";

export default function HomePage() {
  const { homeFeed, posts } = useContext(PostContext);

  useEffect(() => {
    homeFeed();
  }, []);

  return (
    <>
      <header className="sm:hidden lg:block flex items-center justify-between px-3 py-2 sm:border-b-4">
        <div className="flex gap-3 items-center">
          <FaUniversity className="text-[30px] text-blue-700" />
          <h1 className="text-[16px] font-semibold">Campusforum</h1>
        </div>
        <FaFacebookMessenger size={22} className="lg:hidden" />
      </header>

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
