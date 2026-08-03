"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import UserPostSkeleton from "@/skeleton/userPostSkeleton.jsx";
const UserPost = dynamic(() => import("@/components/userPost.jsx"), {
  loading: () => <UserPostSkeleton />,
  ssr: false,
});
import { LuSettings } from "react-icons/lu";
import { PostContext } from "@/app/context/postContext.jsx";
import { useContext, useEffect } from "react";
import NavLink from "@/components/navLink";
import { VirtuosoGrid } from "react-virtuoso";
import LinkButton from "./button";
import NoPosts from "@/components/noPostsAvailable";

function UserProfileUi({ userProfile, userPosts }) {
  const { currentUser, isFollowing, setIsFollowing } = useContext(PostContext);

  useEffect(() => {
    if (userProfile && currentUser) {
      setIsFollowing(userProfile?.followers?.includes(currentUser?._id));
    }
  }, [userProfile, currentUser]);

  const handleONClick = () => {
    if (isFollowing) {
      setIsFollowing(!isFollowing);
      toggleFollow(userProfile._id);
    } else {
      setIsFollowing(!isFollowing);
      toggleFollow(userProfile._id);
    }
  };

  return (
    <div className="lg:px-4">
      {/* profile header */}
      <header className="flex justify-between items-center bg-white px-3 border-b-2 mb-2 border-neutral-300">
        <div>
          <h4 className="text-[18px]">{userProfile?.owner?.username}</h4>
        </div>
        {userProfile?._id === currentUser?._id && (
          <div className="sm:hidden">
            <NavLink href="/settings" icon={LuSettings} label="Settings" />
          </div>
        )}
      </header>

      {/* profile body */}
      <div className="flex flex-col gap-2 border-b-2 border-neutral-300">
        <div className="flex-1 flex mt-2 px-1 gap-4 md:gap-5">
          <Image
            src={
              userProfile.profilePic !== ""
                ? userProfile.profilePic
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
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-lg">
                <strong className="font-extrabold">{userPosts?.length}</strong>{" "}
                Posts
              </span>
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-lg">
                <strong className="font-extrabold">
                  {userProfile?.followers?.length}
                </strong>{" "}
                Followers
              </span>
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-lg">
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
        {userProfile?._id === currentUser?._id && (
          <div className="my-4 px-2">
            <LinkButton href="/profile/edit" text="Edit Profile" />
          </div>
        )}
        {userProfile?._id !== currentUser?._id && (
          <div className="flex gap-4 my-2">
            <LinkButton text="Message" />
            {isFollowing ? (
              <LinkButton text="Following" onClick={handleONClick} />
            ) : (
              <LinkButton text="Follow" onClick={handleONClick} />
            )}
          </div>
        )}
      </div>

      {/* Posts */}
      {userPosts?.length !== 0 ? (
        <VirtuosoGrid
          style={{ height: "400px" }}
          totalCount={userPosts?.length}
          itemContent={(index) => (
            <UserPost key={userPosts[index]._id} post={userPosts[index]} />
          )}
          listClassName="grid grid-cols-3 sm:grid-cols-5 gap-0.5 mt-2"
        />
      ) : (
        <NoPosts />
      )}
    </div>
  );
}

export default React.memo(UserProfileUi);

{
  /* <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
  {userPosts.map((post, index) => (
    <UserPost key={index} post={post} />
  ))}
</div> */
}
