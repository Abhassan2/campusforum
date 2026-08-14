import clientServer from "@/app/config/clientServer";

export const getProfile = async (token) => {
  try {
    const response = await clientServer.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data

  } catch (error) {
    console.error("Error fetching user profile: ", error);
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
