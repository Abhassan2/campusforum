import Image from "next/image";
import Link from "next/link";

export default function UserPost({ post }) {
  return (
    <>
      <Link rel="preload" href={`/post/${post?._id}`}>
        {post?.media[0].type.includes("image") ? (
          <div className="relative">
            <Image
              src={post?.media[0].url}
              loading="eager"
              width={100}
              height={100}
              alt="Campus Forum"
              className="w-full h-35 bg-[#000000d4] sm:w-full sm:h-40"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 absolute bottom-1 right-1"
            >
              <path
                fillRule="evenodd"
                d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div className="relative">
            <video className="w-full h-35 sm:w-full sm:h-40 bg-[#000000d4] p-1">
              <source src={post?.media[0].url} type="video/mp4" />
            </video>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 text-white absolute bottom-1 right-1"
            >
              <path d="M3 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3ZM15 4.75a.75.75 0 0 0-1.28-.53l-2 2a.75.75 0 0 0-.22.53v2.5c0 .199.079.39.22.53l2 2a.75.75 0 0 0 1.28-.53v-6.5Z" />
            </svg>
          </div>
        )}
      </Link>
    </>
  );
}
