"use client";
import { Menu, BadgePlus, Send } from "lucide-react";
import usePostContext from "@/app/context/postContext";
import Image from "next/image";

export default function Header() {
  const { isOpenMenu, setIsOpenMenu } = usePostContext();

  return (
    <>
      <div className="hidden md:hidden sm:flex justify-between items-center px-4 py-2 border-b border-neutral-300">
        <Menu
          className="text-[28px]"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        />
        <h1 className="text-[18px] font-semibold mx-auto ">Campusforum</h1>
        <BadgePlus className="sm:hidden text-[25px] font-bold" />
      </div>

      {/* <header className="sm:hidden md:block flex items-center justify-between px-3 py-2">
        <div className="flex gap-3 items-center">
          <Image
            src="/logo.png"
            alt="Campusforum"
            width={80}
            height={80}
            className="h-10 w-10 object-cover"
            priority
          />
          <h1 className="text-[16px] font-semibold">
            Campus<span className="text-blue-700">Forum</span>
          </h1>
        </div>
        <Send className="size-5.5 md:hidden" />
      </header> */}
    </>
  );
}
