import dynamicImport from "next/dynamic";

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
            src="/campus.png"
            alt="logo"
            width={80}
            height={80}
            className="h-10 w-10 object-cover bg-gray-200 rounded-full"
            priority
          />
          <h1 className="text-[16px] font-semibold">
            Campus<span className="text-orange-400">Forum</span>
          </h1>
        </div>
      </header>

      <PostList posts={posts} />
    </>
  );
}
