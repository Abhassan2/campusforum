"use client";
import { IoMdMenu } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { useContext } from "react";
import { PostContext } from "@/app/context/postContext";

export default function Header() {
  const { isOpenMenu, setIsOpenMenu } = useContext(PostContext);

  return (
    <div className="hidden lg:hidden sm:flex justify-between items-center px-4 py-2 border-b border-neutral-300">
      <IoMdMenu
        className="text-[28px]"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      />
      <h1 className="text-[18px] font-semibold mx-auto ">Campusforum</h1>
      <CiCirclePlus className="sm:hidden text-[25px] font-bold" />
    </div>
  );
}
