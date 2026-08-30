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
      
      <ProfileForm profile={profile} />
      
    </div>
  );
}
