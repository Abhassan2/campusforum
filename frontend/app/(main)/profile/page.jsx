import dynamic from "next/dynamic";
import { getProfile } from "@/lib/api";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"),{
  loading: () => <ProfileSkeleton />,
  ssr: true,
});
import { redirect } from "next/navigation";
import useCookie from "@/hooks/useCookie";

export default async function ProfilePage() {
  const token = await useCookie();
  if (!token) {
    redirect("/login");
  }

  const { profile, userPosts } = await getProfile(token);
  
  return (
    <>
      <ProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
