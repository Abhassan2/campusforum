"use client";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { PostContext } from "@/app/context/postContext.jsx";
import PostCardSkeleton from "@/skeleton/postCardSkeleton.jsx";
const PostCard = dynamic(() => import("@/components/postCard.jsx"), {
  loading: () => <PostCardSkeleton />,
});
import { FaUniversity } from "react-icons/fa";

export default function ShowPostPage() {
  const { showPost, token, setIsLoading, post } = useContext(PostContext);
  const { postId } = useParams();

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      showPost(postId);
    }
  }, [token]);

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
