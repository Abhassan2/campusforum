"use client";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import { PiShareFatBold } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/app/context/postContext";

export default function PostActions({ lenOfComment, postId, postLikes }) {
  const { setPostId, setOpenCommentBox, likeOnPost, currentUser, postCommentLength } =
    useContext(PostContext);
  
  const [isLike, setIsLike] = useState(false);
  const [countLikes, setCountLikes] = useState(0);

  const handleOnClick = () => {
    if (isLike) {
      likeOnPost(postId);
      setIsLike(!isLike);
      setCountLikes((prev) => (prev -= 1));
    } else {
      likeOnPost(postId);
      setIsLike(!isLike);
      setCountLikes((prev) => (prev += 1));
    }
  };

  useEffect(() => {
    setCountLikes(postLikes?.length);
    if (postLikes?.includes(currentUser?._id)) {
      setIsLike(!isLike);
    }
  }, [postLikes?.length]);

  return (
    <div className="flex">
      <div className="w-1/2 flex justify-between">
        <div className="flex gap-2 items-center text-neutral-800">
          {isLike ? (
            <FcLike
              className="text-xl cursor-pointer"
              onClick={handleOnClick}
            />
          ) : (
            <FaRegHeart
              className="text-xl cursor-pointer"
              onClick={handleOnClick}
            />
          )}
          <span>{countLikes}</span>
        </div>
        <div
          onClick={() => {
            setOpenCommentBox(true);
            setPostId(postId);
          }}
          className="flex gap-2 items-center text-neutral-800"
        >
          <FaRegCommentDots className="text-xl cursor-pointer" />
          <span>{postCommentLength && postCommentLength.filter((c)=> c.post === postId).length}</span>
        </div>

        <div className=" text-neutral-800">
          <PiShareFatBold className="text-xl cursor-pointer" />
        </div>
      </div>

      <div className="ml-auto text-neutral-800">
        <MdSaveAlt className="text-xl cursor-pointer" />
      </div>
    </div>
  );
}
