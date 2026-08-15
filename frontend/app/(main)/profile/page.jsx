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

  if (!token) {
    return (
      <p className="flex justify-center items-center h-screen">
        OOPs! something is wrong
      </p>
    );
  }

  const { profile, userPosts } = await getProfile(token);

  return (
    <>
      <ProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
