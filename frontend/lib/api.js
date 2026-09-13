import clientServer from "@/app/config/clientServer";

export const fetchMe = async (token) => {
  try {
    const response = await clientServer.get("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      return response.data.currentUserProfile;
    } else {
      return response.data.currentUserProfile || {};
    }
  } catch (error) {
    console.error("Error fetching current user: ", error);
  }
};

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

export const editProfile = async (token, formData) => {
  try {    
    const jsonData = Object.fromEntries(formData.entries());

    if(jsonData.profilePic instanceof File){
      const sigRes = await clientServer.get("/api/user/get-signature", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { signature, timestamp } = sigRes.data;

      // save config in form with payload
      const configForm = new FormData();
      configForm.append("file", jsonData.profilePic);
      configForm.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      configForm.append("timestamp", timestamp);
      configForm.append("signature", signature);
      configForm.append("folder", "campusHub");
      console.log("in config file",configForm.get("file"));
      
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: "POST", body: configForm },
      );
      const cloudRes = await uploadRes.json();
      jsonData["file_url"] = cloudRes.secure_url;
    }
    
    // save url in mongodb
    const response = await clientServer.put("/api/user/profile/edit",
      jsonData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data;
    }
    console.error("Unexpected error:", error.message);
    return {message: error.message };
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
