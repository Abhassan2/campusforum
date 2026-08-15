import { getProfile } from "@/lib/api";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"));

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { profile, userPosts } = await getProfile(token);

  return (
    <>
      <ProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
