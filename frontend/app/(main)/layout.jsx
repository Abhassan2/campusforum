"use client";
import Header from "@/components/header.jsx";
import dynamic from "next/dynamic";
import InfoPanel from "@/components/infoPanel.jsx";
import CommentUi from "@/ui/Comment";
import { useContext } from "react";
import { PostContext } from "../context/postContext";
const Sidebar = dynamic(() => import("@/components/sidebar.jsx"));
const BottomNav = dynamic(() => import("@/components/bottomNav.jsx"));

export default function MainLayout({ children }) {
  const { openCommentBox } = useContext(PostContext);

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
      <div
        className={`hidden md:block ${openCommentBox && "md:w-100"}`}
      >
        {openCommentBox ? (
          <CommentUi />
        ) : (
          <div className="w-100 h-screen hidden lg:block">
            <InfoPanel
              type="suggestions"
              items={[
                {
                  title: "New on CampusHub",
                  subtitle: "See the latest student posts",
                },
                {
                  title: "Top profiles",
                  subtitle: "Popular creators to follow",
                },
                {
                  title: "Trending topics",
                  subtitle: "What students are talking about",
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
