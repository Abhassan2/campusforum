import { fetchSinglePost } from "@/api/serverApi";
import PostCardSkeleton from "@/skeleton/postCardSkeleton";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const PostCard = dynamic(() => import("@/components/PostCard.jsx"), {
  loading: () => <PostCardSkeleton />,
});
import { FaUniversity } from "react-icons/fa";

export default async function Page({ params }) {
  const { id } = await params;
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value
  console.log("token: ", token);
    
  const { post } = await fetchSinglePost(id);

  return (
    <>
      <div className="flex gap-3 px-3 py-2 border-b border-neutral-300 items-center">
        <FaUniversity className="text-[30px] text-blue-700" />
        <h1 className="text-[16px] font-semibold">Campusforum</h1>
      </div>
      <div className="border-b border-neutral-300 sm:mx-20 lg:flex lg:justify-center">
        <PostCard post={post} />
      </div>
    </>
  );
}
