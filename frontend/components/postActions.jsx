"use client";
import { FcLike } from "react-icons/fc";
import { useEffect, useState } from "react";
import usePostContext from "@/app/context/postContext";
import { Heart, Share2, Bookmark, MessageCircleMore } from "lucide-react";

export default function PostActions({ lenOfComment, postId, postLikes }) {
  const { setPostId, setOpenCommentBox, likeOnPost, currentUser } = usePostContext();
  
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
            <Heart
              size={20}
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
          <MessageCircleMore size={20} className="text-xl cursor-pointer" />
          <span>{lenOfComment}</span>
        </div>

        <div className=" text-neutral-800">
          <Share2 size={20} className="text-xl cursor-pointer" />
        </div>
      </div>

      <div className="ml-auto text-neutral-800">
        <Bookmark size={20} className="text-xl cursor-pointer" />
      </div>
    </div>
  );
}
