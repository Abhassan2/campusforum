import ProfileForm from "@/components/ProfileForm";
import useCookie from "@/hooks/useCookie.jsx";
import { getProfile } from "@/lib/api.js";
import { redirect } from "next/navigation";
import { FaUniversity } from "react-icons/fa";

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
          <FaUniversity className="text-[30px] text-blue-700" />
          <h1 className="text-[16px] font-semibold">Campus Forum</h1>
        </div>
      </header>
      
      <ProfileForm profile={profile} />
      
    </div>
  );
}
