"use client";

import { toast } from "react-toastify";
import { getProfile } from "@/lib/api";
import dynamic from "next/dynamic";
// import { cookies } from "next/headers";
const ProfileUi = dynamic(()=> import("@/ui/Profile"));
// import { redirect } from "next/navigation";

export default function Page() {

  return (
    <>
      <button onClick={() => toast.success("Profile updated!")}>
        Test Toast
      </button>
      <br /><br /><br />
      <button onClick={() => toast.error("Something went wrong!")}>
        Test Error
      </button>
    </>
  )
}
