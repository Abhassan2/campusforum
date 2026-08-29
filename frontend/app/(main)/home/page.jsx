import dynamic from "next/dynamic";
const PostList = dynamic(() => import("@/ui/PostList"));
import { FaUniversity } from "react-icons/fa";
import { Send } from "lucide-react";
import { getFeedPosts } from "@/lib/api";

export default async function HomePage() {

  const { posts } = await getFeedPosts();
  
  return (
    <>
      <header className="sm:hidden lg:block flex items-center justify-between px-3 py-2 sm:border-b-4">
        <div className="flex gap-3 items-center">
          <FaUniversity className="text-[30px] text-blue-700" />
          <h1 className="text-[16px] font-semibold">Campusforum</h1>
        </div>
        <Send size={22} className="lg:hidden" />
      </header>

      <PostList posts={posts} />
    </>
  );
}

