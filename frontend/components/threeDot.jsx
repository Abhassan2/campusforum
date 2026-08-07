"use client";
import { PostContext } from "@/app/context/postContext";
import React, { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ThreeDot({ postId, CommentId }) {
  const { deleteComment, deletePost } = useContext(PostContext)
  const [showTooltip, setShowTooltip] = useState(false);

  const handleDelete = ()=>{
    if(postId){
      deletePost(postId)
    }
    if(CommentId){
      deleteComment(CommentId)
    }
  }

  return (
    <div className="ml-auto mr-5 self-center text-neutral-800 relative">
      <BsThreeDotsVertical
        className="text-[15px] sm:text-[20px] cursor-pointer"
        onClick={() => setShowTooltip(!showTooltip)}
      />

      {showTooltip && (
        <span
          className="absolute -top-4 -left-7 -translate-x-1/2 
            bg-gray-700 text-white text-xs rounded px-2 py-1"
          onClick={()=>{
            handleDelete();
            setShowTooltip(!showTooltip);
          }}
        >
          Delete
        </span>
      )}
    </div>
  );
}
