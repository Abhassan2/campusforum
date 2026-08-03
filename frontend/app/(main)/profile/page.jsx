import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
import { getProfile } from "@/api/serverApi";
const UserProfileComponent = dynamic(() => import("@/ui/profile.jsx"), {
  loading: () => <ProfileSkeleton />,
});

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let userProfile = null
  let userPosts = null
  if(token){
    const data = await getProfile(token)
    userProfile = data.profile
    userPosts = data.userPosts   
  }

  return (
    <>
      <UserProfileComponent userProfile={userProfile} userPosts={userPosts} />
    </>
  );
}
