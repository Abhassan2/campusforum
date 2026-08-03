import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ThreeDot from "./threeDot";
import { PostContext } from "@/app/context/postContext";

export default function PostCardHeader({ post }) {
  const { deletePost, currentUser, setIsFollowing, isFollowing } = useContext(PostContext);

  return (
    <div className="flex border-b md:border-b-0 p-2 border-neutral-300 gap-4 pb-2">
      <Image
        src={
          post?.owner?.profilePic
            ? post?.owner?.profilePic
            : "/default_img.avif"
        }
        loading="eager"
        width={45}
        height={45}
        alt="Profile"
        className="w-11 h-auto md:w-13 rounded-full"
      />
      <div className="flex gap-4">
        <Link rel="preload" href={`/user/${post?.owner?.owner?.username}`}>
          <h2 className="text-[14px] sm:text-[16px] mt-2 font-medium hover:underline cursor-pointer">
            {post?.owner?.owner?.username}
          </h2>
        </Link>
      </div>

      {/* {post?.owner?._id !== currentUser?._id && (
        <div>
          {isFollowing ? (
            <button
              className="h-fit mt-2 px-2 py-1 ml-auto mr-5 text-black border border-neutral-300 bg-gray-200 rounded active:border-black cursor-pointer"
              onClick={handleONClick}
            >
              Following
            </button>
          ) : (
            <button
              className="h-fit mt-2 px-2 py-1 ml-auto mr-5 text-black border border-neutral-300 bg-gray-200 rounded active:border-black cursor-pointer"
              onClick={handleONClick}
            >
              Follow
            </button>
          )}
        </div>
      )} */}

      {post?.owner?._id === currentUser?._id && (
        <ThreeDot deleteMethod={deletePost} id={post?.owner?._id} />
      )}
    </div>
  );
}
