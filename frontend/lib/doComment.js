import clientServer from "@/app/config/clientServer";

const doComment = async (postId) => {
  try {
    const response = await clientServer.post(
      `/api/user/post/${postId}/comment`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.data.success) {
      await fetchCommentsByPostId(postId);
      setComment("");
    } else {
      toast.error("Internal server error");
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

export default doComment 