"use client";
import { useState, memo } from "react";
import Image from "next/image";
import { usePostContext } from "@/app/context/postContext";
import ToggleReadBtn from "./toggleReadBtn";
import ThreeDot from "./threeDot";
import Loader from "@/ui/Loader";

function CommentCard({ comment }) {
  const { currentUser, deletingIds } = usePostContext();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-fit px-2 py-2 border-b md:border-b-0 md:border-t md:border-r-0 border-neutral-300">
      <div className="flex border-neutral-300 gap-3 pb-2">
        <img
          src={comment?.author?.profilePic || "/default_img.avif"}
          loading="eager"
          width={200}
          height={200}
          alt="Profile"
          className="w-8 h-8 sm:w-10 sm:h-10 border border-neutral-300 rounded-full"
        />
        <div className="flex-1 flex gap-2">
          <h2 className="flex flex-col text-[14px] font-medium">
            {comment?.author?.owner?.username}
            <span className="text-[9px] font-light">
              {comment?.createdAt.split("T")[0]}
            </span>
          </h2>
          {comment?.author?._id === currentUser?._id && (
            <span className="text-[14px] bg-gray-200 h-fit rounded-sm px-2 font-medium">
              author
            </span>
          )}
        </div>

        {comment?.author?._id === currentUser?._id &&
          (deletingIds.includes(comment?._id) ? (
            <Loader size="sm" />
          ) : (
            <ThreeDot CommentId={comment?._id} />
          ))}
      </div>

      <p className="text-[14px] md:px-1">
        {expanded ? comment?.text : comment?.text?.substring(0, 60)}
        {/* <br /> */}
        <ToggleReadBtn
          textLength={comment?.text?.length}
          isExpanded={expanded}
          onToggle={() => setExpanded((prev) => !prev)}
        />
      </p>
    </div>
  );
}

export default memo(CommentCard);
