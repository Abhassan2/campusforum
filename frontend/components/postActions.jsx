"use client";
import { FcLike } from "react-icons/fc";
import { useEffect, useState } from "react";
import usePostContext from "@/app/context/postContext";
import { Heart, Share2, Bookmark, MessageCircleMore } from "lucide-react";

export default function PostActions({ lenOfComment, postId, postLikes }) {
  const { setPostId, setOpenCommentBox, likeOnPost, currentUser } = usePostContext();
  
  const [isLike, setIsLike] = useState(postLikes?.includes(currentUser?._id) ?? false);
  const [countLikes, setCountLikes] = useState(postLikes?.length ?? 0);
  
  const handleOnClick = async () => {
    const newIsLike = !isLike;

    setIsLike(newIsLike); 
    setCountLikes((prev) => newIsLike ? prev + 1 : prev - 1);
    try { 
      await likeOnPost(postId); 
    } catch (error) { 
      setIsLike(!newIsLike); 
      setCountLikes((prev) => newIsLike ? prev - 1 : prev + 1); 
    }
  };

  useEffect(() => {
    setCountLikes(postLikes?.length ?? 0);
    setIsLike( postLikes?.includes(currentUser?._id) ?? false );
  }, [postLikes, currentUser?._id]);

  
  return (
    <div className="flex">
      <div className="w-1/2 flex justify-between">
        <div className="flex gap-2 items-center text-neutral-800">
          {isLike ? (
            <FcLike
              className="size-7 cursor-pointer"
              onClick={handleOnClick}
            />
          ) : (
            <Heart
              className="size-7 cursor-pointer"
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
          <MessageCircleMore className="size-7 cursor-pointer" />
          <span>{lenOfComment}</span>
        </div>

        <div className=" text-neutral-800">
          <Share2 className="size-7 cursor-pointer" />
        </div>
      </div>

      <div className="ml-auto text-neutral-800">
        <Bookmark className="size-7 cursor-pointer" />
      </div>
    </div>
  );
}
