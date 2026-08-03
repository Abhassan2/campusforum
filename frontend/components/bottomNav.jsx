"use client"
import { RxHome } from "react-icons/rx";
import { TbWorldSearch } from "react-icons/tb";
import { BiPlusCircle } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";

import NavLink from "./navLink";

export default function BottomNav() {
  return (
    <div className="sticky bottom-0 bg-white border-t border-neutral-300 zoom-100 sm:hidden">
      <ul className="flex justify-around p-2">
        <NavLink href="/home" icon={RxHome} label="Home" />
        <NavLink href="/explore" icon={TbWorldSearch} label="Explore" />
        <NavLink href="/post" icon={BiPlusCircle} label="Create Post" />
        <NavLink href="/profile" icon={FaRegUser} label="Profile" />
      </ul>
    </div>
  );
}
