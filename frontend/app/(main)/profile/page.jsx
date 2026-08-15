import { getProfile } from "@/lib/api";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"));

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let profile;
  let userPosts;
  if(token){
    const data = await getProfile(token);
    profile = data.profile;
    userPosts = data.userPosts;
  } else {
    <P>OOPS! Something is Wrong</P>
  }

  return (
    <>
      <ProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
