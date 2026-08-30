import dynamicImport  from "next/dynamic";
import { Send, Landmark } from "lucide-react";

const PostList = dynamicImport (() => import("@/ui/PostList"));
import { getFeedPosts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { posts } = await getFeedPosts();
  
  return (
    <>
      <header className="sm:hidden md:block flex items-center justify-between px-3 py-2">
        <div className="flex gap-3 items-center">
          <Landmark className="size-8 text-blue-700" />
          <h1 className="text-[16px] font-semibold">Campusforum</h1>
        </div>
        <Send size={22} className="md:hidden" />
      </header>

      <PostList posts={posts} />
    </>
  );
}

