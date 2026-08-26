import clientServer from "@/app/config/clientServer";

export const getProfile = async (token) => {
  try {
    const response = await clientServer.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return response.data

  } catch (error) {
    console.error("Error fetching user profile: ", error);
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
