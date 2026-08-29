import dynamic from "next/dynamic"; 
import { redirect } from "next/navigation";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
import { getOthersProfile } from "@/lib/api";

const ProfileUi = dynamic(() => import("@/ui/Profile.jsx"),{
  loading: () => <ProfileSkeleton />
});

export default async function UsernamePage({params}) {
  const { username } = await params;
  const { profile, posts} = await getOthersProfile(username);
  
  return (
    <>
      <ProfileUi userProfile={profile} userPosts={posts} />
    </>
  );
}

