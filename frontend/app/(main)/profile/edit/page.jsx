import { redirect } from "next/navigation";
import { Landmark } from "lucide-react";
import dynamic from "next/dynamic";

import Loader from "@/ui/Loader";
const ProfileForm = dynamic(()=> import("@/components/ProfileForm"),{
  loading: ()=> <Loader />
});

import useCookie from "@/hooks/useCookie.jsx";
import { getProfile } from "@/lib/api.js";

export default async function ProfileEditPage() {
  const token = await useCookie();
  if(!token){
    redirect("/login");
  }
  
  const { profile } = await getProfile(token);

  return (
    <div>
      <header className="flex px-3 py-2 mb-4 border-b border-neutral-300">
        <div className="flex gap-3 items-center">
          <Landmark className="size-8 text-blue-700" />
          <h1 className="text-[16px] font-semibold">Campusforum</h1>
        </div>
      </header>
      
      <main>
        <div className="inline-block mb-4 mx-2 px-2 sm:mt-5 sm:mb-10 sm:mx-5 sm:px-4 py-2 rounded-xl bg-gray-100">
          <h1>Hi <b>{profile?.owner?.name},</b><br className="sm:hidden" /> you can edit your profile here</h1>
        </div>
        <ProfileForm profile={profile} />
      </main>
      
    </div>
  );
}
