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
  console.log("token: ", token);
  console.log("cookieStore: ", cookieStore.getAll());

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No token found. Please login.</p>
      </div>
    );
  }

  const profile = {}
  const userPosts = []
  const data = await getProfile(token);
  // const profile = data.profile
  // const userPosts = data.userPosts
  console.log("data: ", data);

  return (
    <>
      <UserProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  );
}
