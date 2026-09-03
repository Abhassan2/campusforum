import dynamic from "next/dynamic";
const PostCard = dynamic(()=> import("@/components/PostCard"));

export default function PostList({ posts }) {
  
  return (
    <div>
      <div className="flex flex-col">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <PostCard
              key={post?._id}
              post={post}
            />
          ))}
      </div>
    </div>
  );
}
