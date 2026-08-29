import clientServer from "@/app/config/clientServer";
import { useOptimistic, useTransition } from "react";

export default function useFollow(initialFollowing, initialFollowersCount) {
  const [optimisticState, setOptimisticState] = useOptimistic(
    {
      isFollowing: initialFollowing,
      followersCount: initialFollowersCount,
    },
    (currentState, action) => ({
      isFollowing: action.isFollowing,
      followersCount: action.isFollowing
        ? currentState.followersCount + 1
        : currentState.followersCount - 1,
    }),
  );

  const followAction = async () => {
    const nextFollowing = !optimisticState.isFollowing;

    
    try {
        setOptimisticState({
            isFollowing: nextFollowing,
        });
      const response = await clientServer.put(
        `/api/user/profile/${profileId}/follow`,
        {},
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isFollowing: optimisticState.isFollowing,
    followersCount: optimisticState.followersCount,
    followAction,
  };
}
