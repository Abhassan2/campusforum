"use client";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { PostContext } from "@/app/context/postContext.jsx";
const PostCard = dynamic(() => import("@/components/PostCard.jsx"));
import { FaUniversity } from "react-icons/fa";
import HomeSkeleton from "@/skeleton/homeSkeleton";

export default function ShowPostPage() {
  const { showPost, post, isLoading } = useContext(PostContext);
  const { postId } = useParams();

  useEffect(() => {
    showPost(postId)
  }, []);

  if(isLoading){
    return (
      <HomeSkeleton />
    );
  }

  return (
    <>
      <div className="flex gap-3 px-3 py-2 border-b border-neutral-300 items-center">
        <FaUniversity className="text-[30px] text-blue-700" />
        <h1 className="text-[16px] font-semibold">Campusforum</h1>
      </div>
      <div className="border-b border-neutral-300 sm:mx-20 lg:flex lg:justify-center">
        <PostCard post={post} />
      </div>
    </>
  );
}
