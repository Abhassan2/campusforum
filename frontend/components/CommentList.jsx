"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePostContext } from "@/app/context/postContext";
import CommentSkeleton from "@/skeleton/commentSkeleton";
import NoComments from "@/components/noCommentsAvailable";
import Loader from "../ui/Loader.jsx";
import { MoveLeft, SendHorizontal, Landmark } from "lucide-react";
const CommentCard = dynamic(() => import("@/components/commentCard"), {
  loading: () => <CommentSkeleton />,
  ssr: false,
});

export default function CommentList() {
  const {
    setOpenCommentBox,
    openCommentBox,
    postId,
    comment,
    setComment,
    setPostId,
    comments,
    fetchCommentsByPostId,
    doComment,
  } = usePostContext();
  const [isdoingComment, setIsDoingComment] = useState(false);

  const handleComment = async (postId) => {
    if (!comment.trim()) return;

    setIsDoingComment(true);

    try {
      await doComment(postId);
    } finally {
      setIsDoingComment(false);
    }
  };

  useEffect(() => {
    if (!openCommentBox && postId !== null) return;

    fetchCommentsByPostId(postId);
  }, [openCommentBox, postId]);

  return (
    <div
      className={`w-full fixed bottom-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ${
        openCommentBox ? "translate-y-0 md:w-100" : "translate-y-full"
      } h-screen overflow-y-scroll`}
    >
      <div className="grid">
        <header className="sm:hidden md:block flex items-center justify-between px-3 py-2 mb-7">
          <div className="flex gap-3 items-center">
            <Landmark className="size-8 text-blue-700" />
            <h1 className="text-[16px] font-semibold">Campusforum</h1>
          </div>
        </header>

        <div className=" flex items-center mx-3 mt-4">
          <MoveLeft
            size={30}
            onClick={() => {
              setOpenCommentBox(false);
              setPostId(null);
            }}
            className="border border-black/20 rounded-sm p-1 bg-gray-100 active:bg-gray-200"
          />
          <h2 className="mx-25 font-bold">Comments</h2>
        </div>

        <div className=" flex border-b border-neutral-300 justify-center items-center gap-2 py-5 px-2">
          <input
            type="text"
            placeholder="Write a comment..."
            name="search"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border border-neutral-300 rounded-lg max-w-150
                      bg-gray-100 placeholder:text-[14px] pl-3 py-2 focus:outline-1 outline-blue-600"
          />
          {isdoingComment ? (
            <Loader size="sm" />
          ) : (
            <SendHorizontal
              onClick={() => handleComment(postId)}
              className="size-10 bg-gray-800 rounded-full text-white p-1"
            />
          )}
        </div>

        <div className="flex flex-col">
          {Array.isArray(comments) && comments.length === 0 ? (
            <NoComments />
          ) : (
            comments?.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
