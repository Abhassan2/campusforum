"use client";
import { Menu, BadgePlus } from "lucide-react";
import { useContext } from "react";
import usePostContext from "@/app/context/postContext";

export default function Header() {
  const { isOpenMenu, setIsOpenMenu } = usePostContext()

  return (
    <div className="hidden lg:hidden sm:flex justify-between items-center px-4 py-2 border-b border-neutral-300">
      <Menu
        className="text-[28px]"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      />
      <h1 className="text-[18px] font-semibold mx-auto ">Campusforum</h1>
      <BadgePlus className="sm:hidden text-[25px] font-bold" />
    </div>
  );
}
