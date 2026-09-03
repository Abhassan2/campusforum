"use client";
import { House , Search, BadgePlus, UserRound, Send } from "lucide-react";
import NavLink from "./navLink";

export default function BottomNav() {
  return (
    <div className="sticky bottom-0 bg-white border-t border-neutral-300 zoom-100 sm:hidden">
      <ul className="flex justify-around p-2">
        <NavLink href="/home" icon={House} label="Home" />
        <NavLink href="/explore" icon={Search} label="Explore" />
        <NavLink href="/create-post" icon={BadgePlus} label="Create Post" />
        <NavLink href="/messages" icon={Send} label="Messages" />
        <NavLink href="/profile" icon={UserRound} label="Profile" />
      </ul>
    </div>
  );
}
