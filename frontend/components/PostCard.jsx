"use client";
import dynamic from "next/dynamic";
const PostCardHeader = dynamic(() => import("./postCardHeader"));
const PostActions = dynamic(() => import("./postActions"));
const ToggleReadBtn = dynamic(() => import("./toggleReadBtn"));
import { memo, useEffect, useRef, useState } from "react";
import usePostContext from "@/app/context/postContext";
import { VolumeX, Volume2 } from "lucide-react";

function PostCard({ post }) {
  const { expanded, setExpanded, } = usePostContext();
  const videoRef = useRef();
  const [isMute, setIsMute] = useState(true);
  
  const handleMute = () => {
    if (isMute) {
      videoRef.current.muted = true;
    } else {
      videoRef.current.muted = false;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      handleMute();
    }
  }, [isMute]);

  return (
    <div className="flex flex-col border-t-4 border-neutral-200 md:flex-row ">
      {/* post header */}
      <div className="md:hidden">
        <PostCardHeader post={post} />
      </div>
      {post?.media?.some((m) => m.type.includes("image")) && (
        <div className="w-full aspect-video md:max-w-120 md:w-[41.67vw]">
          <img
            src={post?.media[0]?.url || "/landing_img.png"}
            loading="eager"
            width={100}
            height={100}
            alt="Campus Forum"
            className="w-full h-110 max-h-[80vh] md:h-auto object-fill"
          />
        </div>
      )}
      {post?.media?.some((m) => m.type.includes("video")) && (
        <div className="relative w-full md:max-w-120 md:w-[41.67vw]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            className="w-full max-h-140 md:h-auto md:max-h-[90vh] object-fill"
          >
            <source
              src={post?.media[0]?.url || "/landing_img.png"}
              type="video/mp4"
            />
          </video>
          {isMute ? (
            <VolumeX
              onClick={() => setIsMute(!isMute)}
              className="size-5 absolute text-white right-2 bottom-2"
            />
          ) : (
            <Volume2
              onClick={() => setIsMute(!isMute)}
              className="size-5 absolute text-white right-2 bottom-2"
            />
          )}
        </div>
      )}
      <div
        className="flex flex-col p-2 md:pt-2 md:pb-4 md:border-l-0
        md:pl-2 md:pr-0 md:flex-1 max-w-100 "
      >
        <div className="hidden md:block">
          <PostCardHeader post={post} />
        </div>

        <div className="md:hidden">
          <PostActions
            lenOfComment={post?.comments?.length}
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
              onToggle={() => setExpanded(!expanded)}
            />
          </p>
        </div>

        <div className="hidden px-4 md:block mt-auto">
          <PostActions
            lenOfComment={post?.comments?.length}
            postLikes={post?.likes}
            postId={post?._id}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(PostCard);
