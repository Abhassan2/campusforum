import clientServer from "@/app/config/clientServer";

export const getProfile = async (token) => {
  try {
    const response = await clientServer.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile: ", error);
  }
};

export const getOthersProfile = async (username) => {
  try {
    const response = await clientServer.get(`/api/user/profile/${username}`);

    if (response.data.success) {
      return response.data;
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFeedPosts = async () => {
  try {
    const response = await clientServer.get("/api/user/post");

    if (response.data.success) {
      return response.data;
    } else {
      console.error(response.data.message);
      return response.data;
    }
  } catch (error) {
    console.log("Error fetching all posts: ", error);
  }
};

export const fetchSinglePost = async (postId) => {
  try {
    const response = await clientServer.get(`/api/user/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data);
  }
};

export const fetchCommentsByPostId = async (postId) => {
  try {
    const response = await clientServer.get(`api/user/post/${postId}/comment`);

    if (response.data.success) {
      return response.data;
    } else {
      console.log(response.data.message);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const toggleFollow = async (token, profileId) => {
  try {
    const response = await clientServer.put(
      `/api/user/profile/${profileId}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
