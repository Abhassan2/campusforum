"use client";
import dynamic from "next/dynamic";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
import { useContext, useEffect } from "react";
import { PostContext } from "@/app/context/postContext";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"));

export default function ProfilePage() {
  const { getProfile, profile, userPosts, isLoading } = useContext(PostContext);
  
  useEffect(()=>{
    getProfile();
  }, []);

  if (isLoading) {
    return (
      <ProfileSkeleton />
    );
  }
  
  return (
    <>
      <ProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
