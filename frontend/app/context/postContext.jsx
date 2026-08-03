"use client";
import { createContext, useMemo, useContext, useEffect, useState } from "react";
import clientServer from "../config/clientServer.js";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthContext } from "./authContext.jsx";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const { token, currentUser } = useContext(AuthContext);
  const router = useRouter();

  const [isFollowing, setIsFollowing] = useState(false);
  const [count, setCount] = useState(0);
  const [postId, setPostId] = useState(null);

  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState({}); // stores users profile info
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  
  // const uploadPost = async (caption, file) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await clientServer.post(
  //       "/api/user/post",
  //       { caption, file },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       },
  //     );

  //     if (response.data.success) {
  //       setIsLoading(false);
  //       toast.success(response.data.message);
  //       router.push("/home");
  //     } else {
  //       setIsLoading(false);
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log("error:  ", error);
  //   }
  // };

  const uploadPost = async (file, caption) => {
    if (!file) return;

    try {
      setIsLoading(true);
      const sigRes = await clientServer.get("/api/user/get-signature", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { signature, timestamp } = sigRes.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "campusHub");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: "POST", body: formData },
      );
      const uploadData = await uploadRes.json();

      // save url in mongodb
      const response = await clientServer.post(
        "/api/user/post",
        {
          caption,
          file_url: uploadData.secure_url,
          file_type: uploadData.resource_type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.success) {
        setIsLoading(false);
        toast.success(response.data.message);
        router.push("/home");
      } else {
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error:  ", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await clientServer.delete(`/api/user/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const editProfile = async (formData) => {
    setIsLoading(true);
    try {
      const response = await clientServer.put(
        "/api/user/profile/edit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        setIsLoading(false);
        router.back();
        toast.success(response.data.message);
      } else {
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response?.data);
    }
  };

  const showPost = async (postId) => {
    try {
      const response = await clientServer.get(`/api/user/post/${postId}`);

      if (response.data.success) {
        setIsLoading(false);
        setPost(response.data.post);
      } else {
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response?.data);
    }
  };

  const getAllPosts = async () => {
    try {
      const response = await clientServer.get("/api/user/post");

      if (response.data.success) {
        setIsLoading(false);
        setPosts(response.data.posts);
      } else {
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response?.data);
    }
  };

  const sendComment = async (postId) => {
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
        setComment("");
        fetchCommentsByPostId(postId);
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await clientServer.get(
        `api/user/post/${postId}/comment`,
      );

      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await clientServer.delete(
        `/api/user/post/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        fetchCommentsByPostId(postId);
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const likeOnPost = async (postId) => {
    try {
      const response = await clientServer.put(
        `/api/user/post/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersProfile = async (username) => {
    try {
      const response = await clientServer.get(`/api/user/profile/${username}`);

      if (response.data.success) {
        setProfile(response.data.profile);
        setPosts(response.data.posts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFollow = async (profileId) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    router,
    currentUser,
    token,
    profile,
    postId,
    setPostId,
    isFollowing,
    setIsFollowing,
    posts,
    post,
    comments,
    setComments,
    expanded,
    setExpanded,
    openCommentBox,
    setOpenCommentBox,
    comment,
    count,
    setCount,
    setComment,
    uploadPost,
    isLoading,
    setIsLoading,
    editProfile,
    showPost,
    getAllPosts,
    sendComment,
    deleteComment,
    deletePost,
    likeOnPost,
    getUsersProfile,
    toggleFollow,
    isOpenMenu,
    setIsOpenMenu,
    fetchCommentsByPostId,
  };

  return (
    <PostContext.Provider value={{ ...value }}>{children}</PostContext.Provider>
  );
};

export { PostContext, PostContextProvider };
