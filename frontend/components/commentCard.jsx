"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { PostContext } from "@/app/context/postContext";
import ToggleReadBtn from "./toggleReadBtn";
import ThreeDot from "./threeDot";

export default function CommentCard({ comment }) {
  const { currentUser } = useContext(PostContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-fit px-2 py-2 border-b md:border-b-0 border-neutral-400">
      <div className="flex border-neutral-300 gap-3 pb-2">
        <Image
          src={
            comment?.author.profilePic === ""
              ? "/default_img.avif"
              : comment?.author.profilePic
          }
          loading="eager"
          width={200}
          height={200}
          alt="Profile"
          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-2 rounded-full"
        />
        <div className="flex-1 flex gap-2">
          <h2 className="flex flex-col text-[14px] md:text-base font-medium">
            {comment?.author.owner.username}
            <span className="text-[9px] md:text-[12px] font-light">
              {comment?.createdAt.split("T")[0]}
            </span>
          </h2>
          {comment?.author._id === currentUser?._id && (
            <span className="text-[14px] bg-gray-200 h-fit rounded-sm px-2 md:text-base font-medium">
              author
            </span>
          )}
          {/* <span className="text-[11px] mx-auto sm:text-lg p-0.5 ml-auto font-light">
            {comment?.createdAt.split("T")[0]}
          </span> */}
        </div>

        {comment?.author._id === currentUser?._id && (
          <ThreeDot CommentId={comment?._id} />
        )}
      </div>

      <p className="text-[14px] md:text-[16px]">
        {expanded ? comment?.comment : comment?.comment.substring(0, 60)}
        {/* <br /> */}
        <ToggleReadBtn
          textLength={comment?.comment.length}
          isExpanded={expanded}
          onToggle={()=> setExpanded(prev => !prev)}
        />
      </p>
    </div>
  );
}
