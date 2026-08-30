"use client";
import {
  House,
  Search,
  BadgePlus,
  UserRound,
  Bell,
  LogOut,
  Settings,
  Bookmark,
  MessageSquareMore,
  Landmark
} from "lucide-react";

import NavLink from "./navLink.jsx";
import { useAuthContext } from "@/app/context/authContext.jsx";
import { usePostContext } from "@/app/context/postContext.jsx";

export default function Sidebar() {
  const { handleLogout } = useAuthContext();
  const { isOpenMenu } = usePostContext();

  return (
    <>
      {isOpenMenu ? (
        <div className="hidden sm:flex md:hidden flex-col min-h-screen bg-white sm:w-60 py-2 border-r-4 border-neutral-300">
          <div className="flex items-center gap-2 px-4 py-2">
            <GraduationCap className="text-[30px] text-blue-700" />
            <h1 className="text-[16px] font-semibold">Campusforum</h1>
          </div>

          <div className="px-3">
            {/* Page links */}
            <div className="my-4 border-2 border-neutral-300 rounded-lg">
              <ul className="m-2">
                <NavLink href="/home" icon={House} label="Home" />
                <NavLink href="/explore" icon={Search} label="Explore" />
                <NavLink
                  href="/create-post"
                  icon={BadgePlus}
                  label="Create Post"
                />
                <NavLink href="/profile" icon={UserRound} label="Profile" />
              </ul>
            </div>
            <hr className="text-neutral-400" />
            {/* Notification pages */}
            <div className="my-4 border-2 border-neutral-300 rounded-lg">
              <ul className="m-2">
                <NavLink
                  href="/notifications"
                  icon={Bell}
                  label="Notifications"
                />
                <NavLink
                  href="/messages"
                  icon={MessageSquareMore}
                  label="Messages"
                />
                <NavLink href="/saved-post" icon={Bookmark} label="Saved" />
                <NavLink href="/settings" icon={Settings} label="Settings" />
              </ul>
            </div>

            {/* Logout btn */}
            <button
              onClick={() => handleLogout()}
              className="w-full flex items-center gap-2 my-2 px-3 py-2 rounded-md bg-gray-200 cursor-pointer active:bg-white active:outline-1 outline-neutral-300 transition"
            >
              <LogOut className="text-2xl font-bold " />
              <span className="list-none sm:text-[16px] font-extralight ">
                Logout
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex md:flex-col min-h-screen bg-white md:w-60 py-5 border-r-4 border-neutral-300">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 mx-3 rounded-lg">
            <Landmark className="size-8 text-blue-700" />
            <h1 className="text-[16px] font-semibold">Campusforum</h1>
          </div>

          <div className="px-3">
            {/* Page links */}
            <div className="my-4 border-2 border-neutral-300 rounded-lg">
              <ul className="m-2">
                <NavLink href="/home" icon={House} label="Home" />
                <NavLink href="/explore" icon={Search} label="Explore" />
                <NavLink
                  href="/create-post"
                  icon={BadgePlus}
                  label="Create Post"
                />
                <NavLink href="/profile" icon={UserRound} label="Profile" />
              </ul>
            </div>
            <hr className="text-neutral-400" />
            {/* Notification pages */}
            <div className="my-4 border-2 border-neutral-300 rounded-lg">
              <ul className="m-2">
                <NavLink
                  href="/notifications"
                  icon={Bell}
                  label="Notifications"
                />
                <NavLink
                  href="/messages"
                  icon={MessageSquareMore}
                  label="Messages"
                />
                <NavLink href="/saved-post" icon={Bookmark} label="Saved" />
                <NavLink href="/settings" icon={Settings} label="Settings" />
              </ul>
            </div>

            {/* Logout btn */}
            <button
              onClick={() => handleLogout()}
              className="w-full flex items-center gap-2 my-2 px-3 py-2 rounded-md bg-gray-200 cursor-pointer active:bg-white active:outline-1 outline-neutral-300 transition"
            >
              <LogOut className="text-2xl font-bold " />
              <span className="list-none sm:text-[16px] font-extralight ">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
