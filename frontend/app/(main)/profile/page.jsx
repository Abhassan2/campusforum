import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import ProfileSkeleton from "@/skeleton/profileSkeleton";
import { getProfile } from "@/api/serverApi";

const UserProfileUi = dynamic(() => import("@/ui/profile.jsx"), {
  loading: () => <ProfileSkeleton />,
});

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("cookieStore: ", cookieStore.getAll());

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No token found. Please login.</p>
      </div>
    );
  }

  let profile = {}
  let userPosts = []
  const data = await getProfile(token);
  // console.log("data: ", data);
  profile = data.profile;
  userPosts = data.userPosts;

  return (
    <>
      <UserProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
