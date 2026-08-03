import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import HomeSkeleton from "@/skeleton/homeSkeleton";
const PostList = dynamic(()=> import("@/ui/postList"),{
  loading: () => <HomeSkeleton />,
});
import { getAllPosts } from "@/api/serverApi";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let posts = null;
  if (token) {
    const data = await getAllPosts();
    posts = data.posts;
  }

  return (
    <>
      <PostList posts={posts} />
    </>
  );
}

{
  /* <div className="grid sm:px-2 sm:grid-cols-2 lg:grid-cols-none lg:flex lg:flex-wrap lg:justify-center gap-2">
  {Array.isArray(postData?.posts) &&
    postData?.posts.map((post) => (
      <PostCard
        key={post._id}
        post={post}
        comments={
          postData?.comments &&
          postData?.comments.filter((comment) => comment?.post === post._id)
        }
      />
    ))}
</div> */
}
