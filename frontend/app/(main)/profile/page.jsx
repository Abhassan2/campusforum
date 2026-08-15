import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { getProfile } from "@/lib/api";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"),{
  loading: () => <ProfileSkeleton />
});

export default async function ProfilePage() {
  const cookieStore = await cookies();
  console.log("ALL COOKIES:", cookieStore.getAll());
  const token = cookieStore.get("token")?.value;
  console.log("TOKEN:", token);
  if (!token) {
    return (
      <p className="flex justify-center items-center h-screen">
        OOPs! something is wrong
      </p>
    );
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
