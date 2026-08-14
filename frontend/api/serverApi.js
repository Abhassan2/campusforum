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
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.log("Error fetching user profile: ", error);
  }
};

export const getAllPosts = async () => {
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

export const getUsersProfile = async (username) => {
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

export const fetchSinglePost = async (postId) => {
  try {
    const response = await clientServer.get(`/api/user/post/${postId}`);

    if (response.data.success) {
      return response.data;
      // setPost(response.data.post);
      // setPostCommentLength(response.data.commentLength);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

// export const fetchCommentsByPostId = async (postId)=>{
//   try {
//     const response = await clientServer.get(`api/user/post/${postId}/comment`);

//     if(response.data.success){
//       return response.data;
//     } else {
//       console.log(response.data.message);
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
