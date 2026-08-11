"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PostContext } from "@/app/context/postContext";
import UserPost from "@/components/CubePost.jsx";
import { useContext, useEffect, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import LinkButton from "@/ui/LinkButton";
import NoPosts from "@/components/noPostsAvailable";
import NavLink from "@/components/navLink";
import { LuSettings } from "react-icons/lu";
import ProfileSkeleton from "@/skeleton/profileSkeleton";

export default function UsernamePage() {
  const {
    currentUser,
    getUsersProfile,
    profile,
    posts,
    token,
    toggleFollow,
    isFollowing,
    setIsFollowing,
    isLoading
  } = useContext(PostContext);
  const { username } = useParams();

  useEffect(() => {
    if (token) {
      getUsersProfile(username);
    }
  }, [token, isFollowing]);

  useEffect(() => {
    if (profile && currentUser) {
      setIsFollowing(profile?.followers?.includes(currentUser?._id));
    }
  }, [profile, currentUser]);

  const handleONClick = () => {
    if (isFollowing) {
      setIsFollowing(!isFollowing);
      toggleFollow(profile._id);
    } else {
      setIsFollowing(!isFollowing);
      toggleFollow(profile._id);
    }
  };

  if(isLoading){
    return <ProfileSkeleton />
  }

  return (
    <div className="lg:px-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white px-3 py-2 border-b-2 mb-2 border-neutral-300">
        <div>
          <h4 className="text-[18px]">{profile?.owner?.username}</h4>
        </div>
        {profile?._id === currentUser?._id && (
          <div className="sm:hidden">
            <NavLink href="/settings" icon={LuSettings} label="Settings" />
          </div>
        )}
      </header>

      <div className="flex flex-col gap-2 border-b-2 border-neutral-300">
        <div className="flex-1 flex mt-2 gap-4 px-1 md:gap-5">
          <Image
            src={profile?.profilePic || "/default_img.avif"}
            loading="eager"
            width={50}
            height={50}
            alt="postData?.profile"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] max-w-85 md:max-w-120 font-medium md:text-xl">
                {profile?.owner?.name}
              </h2>
            </div>
            <div className="flex gap-4 md:gap-6 mt-1 cursor-pointer">
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-lg">
                <strong className="font-extrabold">{posts?.length}</strong>{" "}
                Posts
              </span>
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-lg">
                <strong className="font-extrabold">
                  {profile?.followers?.length}
                </strong>{" "}
                Followers
              </span>
              <span className="flex flex-col text-[14px] text-neutral-700 md:text-lg">
                <strong className="font-extrabold">
                  {profile?.following?.length}
                </strong>{" "}
                Following
              </span>
            </div>
          </div>
        </div>

        <div className="mx-2 max-w-200">
          <p className="text-[14px] sm:text-base">{profile?.bio}</p>
        </div>
        <div className="flex gap-6 my-2 px-3">
          <LinkButton text="Message" />
          {isFollowing ? (
            <LinkButton text="Following" onClick={handleONClick} />
          ) : (
            <LinkButton text="Follow" onClick={handleONClick} />
          )}
        </div>
      </div>

      {/* Posts */}
      {posts?.length !== 0 ? (
        <VirtuosoGrid
          style={{ height: "450px" }}
          totalCount={posts?.length}
          itemContent={(index) => (
            <UserPost key={posts[index]._id} post={posts[index]} />
          )}
          listClassName="grid grid-cols-3 sm:grid-cols-5 gap-0.5 mt-2"
        />
      ) : (
        <NoPosts />
      )}
    </div>
  );
}

{
  // <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
  //     {Array.isArray(posts) &&
  //       posts.map((post, index) => <UserPost key={index} post={post} />)}
  // </div>
}
