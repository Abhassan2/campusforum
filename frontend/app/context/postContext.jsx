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
  const [userPosts, setUserPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [postCommentLength, setPostCommentLength] = useState([]);
  const [comment, setComment] = useState("");
  const [deletingIds, setDeletingIds] = useState([]);

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
      setDeletingIds((prev) => [...prev, postId]);
      const response = await clientServer.delete(`/api/user/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        await homeFeed();
        toast.success(response.data.message);
      } else {
        console.log("delete post")
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("delete post")
      toast.error(error.response?.data.message);
    } finally {
      setDeletingIds((prev) => prev.filter((cid) => cid !== postId));
    }
  };

  const homeFeed = async () => {
    try {
      setIsLoading(true)
      const response = await clientServer.get("/api/user/post");

      if (response.data.success) {
        setPosts(response.data.posts);
        setPostCommentLength(response.data.comments);
      } else {
        console.error("In homeFeed error: ",response.data.message);
      }
    } catch (error) {
      console.log("Error fetching all posts as homeFeed: ", error);
    } finally {
      setIsLoading(false)
    }
  };

  const getProfile = async () => {
    try {
      setIsLoading(true)
      const response = await clientServer.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setProfile(response.data.profile);
        setUserPosts(response.data.userPosts);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error fetching user profile: ", error);
    } finally {
      setIsLoading(false)
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
        setPostCommentLength(response.data.commentLength);
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
      setIsLoading(true);
      const response = await clientServer.get("/api/user/post");

      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setIsLoading(true)
      const response = await clientServer.get(
        `api/user/post/${postId}/comment`,
      );

      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const deleteComment = async (commentId) => {
    try {
      setDeletingIds((prev) => [...prev, commentId]);
      const response = await clientServer.delete(
        `/api/user/post/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        await fetchCommentsByPostId(postId);
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setDeletingIds((prev) => prev.filter((cid) => cid !== commentId));
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
      setIsLoading(true)
      const response = await clientServer.get(`/api/user/profile/${username}`);

      if (response.data.success) {
        setProfile(response.data.profile);
        setPosts(response.data.posts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
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
    homeFeed,
    getProfile,
    postCommentLength,
    deletingIds,

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
    userPosts,
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
    doComment,
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
