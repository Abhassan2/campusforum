import dynamic from "next/dynamic";
import { getProfile } from "@/lib/api";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"),{
  loading: () => <ProfileSkeleton />
});
import { redirect } from "next/navigation";
import getToken from "@/hooks/getToken";

export default async function ProfilePage() {
  const token = await getToken();
  
  if (!token) {
    redirect("/login");
  }

  const profileData = await getProfile(token);

  if (!profileData) {
    return (
      <p className="flex justify-center items-center h-screen">
        Failed to load profile
      </p>
    );
  }

  const { profile, userPosts } = profileData;
  
  return (
    <>
      <ProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
