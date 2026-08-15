import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { getProfile } from "@/lib/api";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"),{
  loading: () => <ProfileSkeleton />
});
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

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
