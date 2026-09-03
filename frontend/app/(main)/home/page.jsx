import dynamicImport from "next/dynamic";
import { Send, Landmark } from "lucide-react";

const PostList = dynamicImport(() => import("@/ui/PostList"));
import { getFeedPosts } from "@/lib/api";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { posts } = await getFeedPosts();
  
  return (
    <>
      <header className="sm:hidden md:block flex items-center justify-between px-3 py-2">
        <div className="flex gap-3 items-center">
          <Image
            src="/logo.png"
            alt="Campusforum"
            width={80}
            height={80}
            className="h-9 w-9 object-cover"
            priority
          />
          <h1 className="text-[16px] font-semibold">
            Campus<span className="text-blue-700">Forum</span>
          </h1>
        </div>
        <Send size={22} className="md:hidden" />
      </header>

      <PostList posts={posts} />
    </>
  );
}
