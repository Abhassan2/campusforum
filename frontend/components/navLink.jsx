"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, icon: Icon, label }) {
 const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 md:my-2 px-3 py-2 rounded-md transition
        ${isActive 
          ? "border-b-4 rounded sm:border-b-0 sm:rounded-md sm:bg-blue-600 sm:text-white" 
          : "hover:bg-gray-200"}`}
    >
      <Icon className="text-2xl sm:text-xl font-bold" />
      <span className=" text-base md:text-[18px] font-extralight hidden sm:block">{label}</span>
    </Link>
  );
}
