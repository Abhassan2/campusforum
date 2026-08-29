import React, { useCallback, useState, useEffect } from "react";
import usePostContext from "@/app/context/postContext";

function FollowBtn({ userProfile}) {
  const { currentUser, toggleFollow } = usePostContext();

  const [isFollowing, setIsFollowing] = useState(
    userProfile?.followers?.includes(currentUser?._id) ?? false,
  );

  useEffect(() => {
    setIsFollowing(userProfile?.followers?.includes(currentUser?._id) ?? false);
  }, [userProfile?.followers, currentUser?._id]);

  const handleONClick = useCallback(() => {
    setIsFollowing((prev) => !prev);
    toggleFollow(userProfile._id);
  }, [toggleFollow, userProfile._id]);

  return (
    <div
      className="max-w-45 px-10 py-1 border rounded bg-gray-50 hover:bg-gray-200 cursor-pointer"
      onClick={handleONClick}
    >
      {isFollowing ? "Following" : "Follow"}
    </div>
  );
}

export default React.memo(FollowBtn);
