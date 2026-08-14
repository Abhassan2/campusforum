import { getProfile } from "@/lib/api";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const ProfileUi = dynamic(()=> import("@/ui/Profile"));
import { redirect } from "next/navigation";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value

    if(!token){
        redirect("/login")
    }

    const { profile, userPosts} = await getProfile(token);
  return (
    <>
      <ProfileUi userProfile={profile} userPosts={userPosts} />
    </>
  )
}
