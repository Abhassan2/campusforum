"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
const PostCardHeader = dynamic(() => import("./postCardHeader"));
const PostActions = dynamic(() => import("./postActions"));
const ToggleReadBtn = dynamic(() => import("./toggleReadBtn"));
import react, { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "@/app/context/postContext";

function PostCard({ post, comments }) {
  const {
    expanded,
    setExpanded,
  } = useContext(PostContext);
  const videoRef = useRef();
  const [isMute, setIsMute] = useState(true);

  const handleMute = () => {
    if (isMute) {    
      videoRef.current.muted = true;
    } else {    
      videoRef.current.muted = false;
    }
  };

  useEffect(()=>{
    if(videoRef.current){
      handleMute();
    }
  }, [isMute]);

  return (
    <div
      className="flex flex-col border-t-4 border-gray-200  md:border-4 md:border-b-2 md:flex-row md:gap-0"
    >
      {/* post header */}
      <div className="md:hidden">
        <PostCardHeader post={post} />
      </div>
      {post?.media?.some((m)=> m.type.includes("image")) && (
        <Image
          src={post?.media[0]?.url || "/landing_img.png"}
          loading="eager"
          width={100}
          height={100}
          alt="Campus Forum"
          className="w-full max-h-115 min-w-60 sm:w-full sm:h-120 md:max-w-150"
        />
      )}
      {post?.media?.some((m)=> m.type.includes("video")) && (
        <div className="relative aspect-w-16 aspect-h-9 w-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            className="w-full max-h-125 md:max-h-175 object-cover"
          >
            <source
              src={post?.media[0]?.url || "/landing_img.png"}
              type="video/mp4"
            />
          </video>
          {isMute ? 
          (<svg
            onClick={()=> setIsMute(!isMute)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 absolute text-white right-2 bottom-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>) :
          (<svg
            onClick={()=> setIsMute(!isMute)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 absolute text-white right-2 bottom-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>)}
        </div>
      )}
      <div
        className="flex flex-col border-t p-2 min-w-70 md:py-4 md:border md:border-l-0
        md:pl-2 md:pr-0 border-neutral-300 md:flex-1 "
      >
        <div className="hidden md:block">
          <PostCardHeader post={post} />
        </div>

        <div className="md:hidden">
          <PostActions
            lenOfComment={comments?.length}
            postLikes={post?.likes}
            postId={post?._id}
          />
        </div>

        {/* post caption */}
        <div className="text-[14px] my-2 md:text-[16px] md:px-4">
          <p className="text-clip">
            {expanded ? post?.caption : post?.caption?.slice(0, 60)}
            <ToggleReadBtn
              textLength={post?.caption?.length}
              isExpanded={expanded}
              onToggle={()=> setExpanded(!expanded)}
            />
          </p>
        </div>

        <div className="hidden px-4 md:block mt-auto">
          <PostActions
            lenOfComment={comments?.length}
            postLikes={post?.likes}
            postId={post?._id}
          />
        </div>
      </div>
    </div>
  );
}

export default react.memo(PostCard);
