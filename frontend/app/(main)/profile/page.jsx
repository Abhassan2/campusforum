import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { getProfile } from "@/lib/api";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"),{
  loading: () => <ProfileSkeleton />
});

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("========== PROFILE DEBUG ==========");
  console.log("TOKEN EXISTS:", !!token);

  if (!token) {
    console.log("NO TOKEN FOUND");
    return (
      <p className="flex justify-center items-center h-screen">
        OOPs! something is wrong
      </p>
    );
  }

  const profileData = await getProfile(token);

  console.log("PROFILE DATA:", profileData);
  console.log("===================================");

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
