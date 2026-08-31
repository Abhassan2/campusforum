import dynamic from "next/dynamic";
import { getProfile } from "@/lib/api";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"));
import getLoggedInToken from "@/lib/getLoggedInToken.js";

export default async function ProfilePage() {
  const token = await getLoggedInToken();

  const { profile, userPosts } = await getProfile(token);
  
  return (
    <>
      <ProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
