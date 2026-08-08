"use client";
import dynamic from "next/dynamic";
import UserPostSkeleton from "@/skeleton/userPostSkeleton";
const UserPost = dynamic(() => import("@/components/userPost"), {
  loading: () => <UserPostSkeleton />,
  ssr: false,
});
import { PostContext } from "@/app/context/postContext";
import { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaUniversity } from "react-icons/fa";
import { VirtuosoGrid } from "react-virtuoso";

export default function ExplorePage() {
  const { getAllPosts, token, posts } = useContext(PostContext);
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
          <FaUniversity className="text-[28px] " />
          <h1 className="text-[16px] font-semibold">Explore</h1>
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
          <IoSearch
            className="text-[42px] text-center border-2 border-blue-700  rounded-r-3xl
            p-2 bg-blue-700 cursor-pointer text-white"
            onClick={handleSearch}
          />
        </div>
      </header>

      {/* explore body */}
      <VirtuosoGrid
        style={{ height: "80vh", width: "100%" }}
        totalCount={posts?.length}
        itemContent={(index) => (
          <UserPost key={index} post={posts[index]} />
        )}
        listClassName="grid grid-cols-3 sm:grid-cols-5 gap-0.5 mt-2"
      />
    </div>
  );
}

{
  /* <div
  className="border-gray-200 p-2 border-t-2
      grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-5"
>
  {Array.isArray(postData.posts) &&
    postData.posts.map((post, index) => (
      <UserPost key={index} post={post} />
    ))}
</div> */
}
