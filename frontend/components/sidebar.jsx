"use client";
import { RxHome } from "react-icons/rx";
import { TbWorldSearch, TbLogout } from "react-icons/tb";
import { BiPlusCircle } from "react-icons/bi";
import { FaRegUser, FaUniversity } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { LuMessageCircleMore, LuBookmark, LuSettings } from "react-icons/lu";
import { RiMenuFoldLine } from "react-icons/ri";

import NavLink from "./navLink.jsx";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext.jsx";
import { PostContext } from "@/app/context/postContext.jsx";

export default function Sidebar() {
  const { handleLogout } = useContext(AuthContext);
  const { isOpenMenu, setIsOpenMenu } = useContext(PostContext);

  return (
    <>
      {isOpenMenu ? (
        <div className="hidden sm:flex flex-col min-h-screen bg-white sm:w-50 md:w-60 py-5 border-r-4 border-neutral-300">
          <div className="flex items-center gap-2 px-4 py-2">
            <FaUniversity className="text-[30px] text-blue-700" />
            <h1 className="text-[16px] font-semibold">Campusforum</h1>
          </div>

          <div className="px-3">
            {/* Page links */}
            <div className="my-4 border-2 border-neutral-300 rounded-lg">
              <ul className="m-2">
                <NavLink href="/home" icon={RxHome} label="Home" />
                <NavLink href="/explore" icon={TbWorldSearch} label="Explore" />
                <NavLink href="/create-post" icon={BiPlusCircle} label="Create Post" />
                <NavLink href="/profile" icon={FaRegUser} label="Profile" />
              </ul>
            </div>
            <hr className="text-neutral-400" />
            {/* Notification pages */}
            <div className="my-4 border-2 border-neutral-300 rounded-lg">
              <ul className="m-2">
                <NavLink
                  href="/notifications"
                  icon={MdOutlineNotificationsNone}
                  label="Notifications"
                />
                <NavLink
                  href="/messages"
                  icon={LuMessageCircleMore}
                  label="Messages"
                />
                <NavLink href="/saved-post" icon={LuBookmark} label="Saved" />
                <NavLink href="/settings" icon={LuSettings} label="Settings" />
              </ul>
            </div>

            {/* Logout btn */}
            <button onClick={()=> handleLogout()} className="w-full flex items-center gap-2 my-2 px-3 py-2 rounded-md bg-gray-200 cursor-pointer active:bg-white active:outline-1 outline-neutral-300 transition">
              <TbLogout className="text-2xl font-bold " />
              <span className="list-none sm:text-[16px] font-extralight ">
                Logout
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex lg:flex-col min-h-screen bg-white sm:w-50 md:w-60 py-5 border-r-4 border-neutral-300">
          <div className="flex items-center gap-2 px-4 py-2">
            <FaUniversity className="text-[30px] text-blue-700" />
            <h1 className="text-[16px] font-semibold">Campusforum</h1>
          </div>

          <div className="px-3">
            {/* Page links */}
            <div className="my-4 border-2 border-neutral-300 rounded-lg">
              <ul className="m-2">
                <NavLink href="/home" icon={RxHome} label="Home" />
                <NavLink href="/explore" icon={TbWorldSearch} label="Explore" />
                <NavLink href="/post" icon={BiPlusCircle} label="Create Post" />
                <NavLink href="/profile" icon={FaRegUser} label="Profile" />
              </ul>
            </div>
            <hr className="text-neutral-400" />
            {/* Notification pages */}
            <div className="my-4 border-2 border-neutral-300 rounded-lg">
              <ul className="m-2">
                <NavLink
                  href="/notifications"
                  icon={MdOutlineNotificationsNone}
                  label="Notifications"
                />
                <NavLink
                  href="/messages"
                  icon={LuMessageCircleMore}
                  label="Messages"
                />
                <NavLink href="/saved-post" icon={LuBookmark} label="Saved" />
                <NavLink href="/settings" icon={LuSettings} label="Settings" />
              </ul>
            </div>

            {/* Logout btn */}
            <button onClick={()=> handleLogout()} className="w-full flex items-center gap-2 my-2 px-3 py-2 rounded-md bg-gray-200 cursor-pointer active:bg-white active:outline-1 outline-neutral-300 transition">
              <TbLogout className="text-2xl font-bold " />
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
