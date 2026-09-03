"use client";
import dynamic from "next/dynamic";
import UserPostSkeleton from "@/skeleton/CubePostSkeleton";
const UserPost = dynamic(() => import("@/components/CubePost"), {
  loading: () => <UserPostSkeleton />,
  ssr: false,
});
import usePostContext from "@/app/context/postContext";
import { useEffect, useState } from "react";
import { Landmark, Search } from "lucide-react";

export default function ExplorePage() {
  const { getAllPosts, token, posts } = usePostContext();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // if (onSearch) {
    //   onSearch(query); // pass query up to parent
    // }
  };

  useEffect(() => {
    if (token) {
      getAllPosts();
    }
  }, [token]);

  return (
    <div className="py-2 flex flex-col sm:items-center">
      {/* explore header */}
      <header className="w-full bg-white sticky top-0 left-0 z-100 flex sm:items-center flex-col gap-5 px-3 pt-2 pb-4 border-b border-neutral-300">
        <div className="flex gap-3 items-center">
          <Landmark className="size-7 md:size-8 " />
          <h1 className="text-[18px] md:text-xl font-semibold">Explore</h1>
        </div>

        <div className="flex items-center sm:w-[60vw]">
          <input
            type="text"
            placeholder="Search here"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 border border-neutral-300 border-r-0 rounded-l-3xl bg-gray-100 
                      placeholder:text-[14px] pl-3 py-2 outline-0"
          />
          <Search
            className="size-10.25 text-center border-2 border-blue-700 rounded-r-3xl
            p-2 bg-blue-700 cursor-pointer text-white"
            onClick={handleSearch}
          />
        </div>
      </header>
      {/* explore body */}
      <div
        className="md:px-10 grid grid-cols-3 sm:grid-cols-5 gap-0.5 mt-2"
      >
        {Array.isArray(posts) &&
          posts.map((post) => (
            <UserPost key={post?._id} post={post} />
          ))}
      </div>
    </div>
  );
}

