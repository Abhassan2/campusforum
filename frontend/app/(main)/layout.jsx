"use client";
import Header from "@/components/header.jsx";
import dynamic from "next/dynamic";
import CommentUi from "@/ui/Comment";
import SuggestCard from "@/components/SuggestCard";
const Sidebar = dynamic(() => import("@/components/sidebar.jsx"));
const BottomNav = dynamic(() => import("@/components/bottomNav.jsx"));

export default function MainLayout({ children }) {

  return (
    <div className="flex flex-col h-screen sm:flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-scroll">
          {children}
        </div>
        <BottomNav />
      </div>
      <div className="md:hidden">
        <CommentUi />
      </div>

      {/* here can run ads or trendings/suggestions */}
      <SuggestCard />
    </div>
  );
}
