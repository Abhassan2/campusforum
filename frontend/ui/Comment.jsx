"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { PostContext } from "@/app/context/postContext";
import CommentSkeleton from "@/skeleton/commentSkeleton";
import NoComments from "@/components/noCommentsAvailable";
const CommentCard = dynamic(() => import("@/components/commentCard"), {
  loading: () => <CommentSkeleton />,
});
import { VirtuosoGrid } from "react-virtuoso";
import Loader from "@/components/Loader";

export default function CommentUi() {
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
  } = useContext(PostContext);
  const [isdoingComment, setIsDoingComment] = useState(false);

  const handleComment = async (postId) => {
    if (comment !== "") {
      setIsDoingComment(true);
      await doComment(postId);
      setIsDoingComment(false);
    }
  };

  useEffect(() => {
    if (openCommentBox && postId !== null) {
      fetchCommentsByPostId(postId);
    }
  }, [openCommentBox, postId]);

  return (
    <div
      className={`w-full fixed bottom-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ${
        openCommentBox ? "translate-y-0 md:w-100" : "translate-y-full"
      } h-[95vh] md:h-screen overflow-y-scroll`}
    >
      <div className="grid">
        <div className=" flex items-center mx-3 mt-4">
          <svg
            onClick={() => {
              setOpenCommentBox(false);
              setPostId(null);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <h2 className="mx-25 font-bold">Comments</h2>
        </div>

        <div className=" flex border-b border-neutral-300 justify-center gap-2 py-5 px-2">
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
            <Loader size="sm" text1="" />
          ) : (
            <svg
              onClick={() => handleComment(postId)}
              id="doComment"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10 bg-gray-800 rounded-full text-white p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          )}
        </div>

        {Array.isArray(comments) && comments?.length === 0 ? (
          <NoComments />
        ) : (
          <VirtuosoGrid
            style={{ height: "100vh" }}
            totalCount={comments?.length}
            itemContent={(index) => (
              <CommentCard
                key={comments[index]._id}
                comment={comments[index]}
              />
            )}
            listClassName="grid grid-cols-1"
            itemClassName="md:border-b md:border-r"
          />
        )}
      </div>
    </div>
  );
}
