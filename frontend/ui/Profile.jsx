"use client";
import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import UserPostSkeleton from "@/skeleton/CubePostSkeleton.jsx";
import ButtonSkeleton from "@/skeleton/ButtonSkeleton";

import { Settings } from "lucide-react";
import usePostContext from "@/app/context/postContext.jsx";
import NavLink from "@/components/navLink";
import NoPosts from "@/components/noPostsAvailable";

const UserPost = dynamic(() => import("@/components/CubePost.jsx"), {
  loading: () => <UserPostSkeleton />,
  ssr: false,
});
const LinkButton = dynamic(() => import("./LinkButton.jsx"), {
  loading: () => <ButtonSkeleton />,
  ssr: false,
});
const FollowBtn = dynamic(() => import("@/ui/FollowBtn.jsx"), {
  loading: () => <ButtonSkeleton />,
  ssr: false,
});


function ProfileUi({ userProfile, userPosts }) {
  const { currentUser } = usePostContext();

  return (
    <div className="lg:px-4">
      {/* profile header */}
      <header className="flex justify-between items-center min-h-11 bg-white pl-2 border-b mb-2 border-neutral-300">
        <div>
          <h4 className="text-[18px]">{"@" + userProfile?.owner?.username}</h4>
        </div>
        {userProfile?._id === currentUser?._id && (
          <div className="sm:hidden">
            <NavLink href="/settings" icon={Settings} label="Settings" />
          </div>
        )}
      </header>

      {/* profile body */}
      <div className="flex flex-col gap-2 border-b border-neutral-300">
        <div className="flex-1 flex mt-2 px-1 gap-4 md:gap-5">
          <Image
            src={
              userProfile?.profilePic
                ? userProfile?.profilePic
                : "/default_img.avif"
            }
            loading="eager"
            width={50}
            height={50}
            alt="Profile"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] max-w-85 md:max-w-120 font-medium md:text-xl">
                {userProfile?.owner?.name}
              </h2>
            </div>
            <div className="flex gap-4 md:gap-6 mt-1 cursor-pointer">
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-[16px]">
                <strong className="font-extrabold">{userPosts?.length}</strong>{" "}
                Posts
              </span>
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-[16px]">
                <strong className="font-extrabold">
                  {userProfile?.followers?.length}
                </strong>{" "}
                Followers
              </span>
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-[16px]">
                <strong className="font-extrabold">
                  {userProfile?.following?.length}
                </strong>{" "}
                Following
              </span>
            </div>
          </div>
        </div>

        <div className="mx-2 max-w-200">
          <p className="text-[14px] sm:text-base">{userProfile?.bio}</p>
        </div>

        <div className="flex gap-4 mx-2 my-2">
          {userProfile?._id === currentUser?._id ? (
            <LinkButton href="/profile/edit" text="Edit Profile" />
          ) : (
            <>
              <LinkButton text="Message" />
              <FollowBtn
                userProfile={userProfile}
              />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-0.5 mt-2 ">
        {/* Posts */}
        {Array.isArray(userPosts) && userPosts.length === 0 ? (
          <NoPosts />
        ) : (
          userPosts?.map((post) => <UserPost key={post?._id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default React.memo(ProfileUi);
