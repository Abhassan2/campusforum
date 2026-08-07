import express from "express";
import {
  uploadPost,
  deletePost,
  getAllPosts,
  showPost,
  postingComments,
  deleteComment,
  likeOnPost,
  fetchCommentsByPostId,
  uploadingPost,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({storage});
const postRouter = express.Router();


postRouter.get("/", getAllPosts);
// postRouter.post("/", authMiddleware, upload.single("file"), uploadPost);
postRouter.post("/", authMiddleware, uploadingPost);
postRouter.delete("/:postId", authMiddleware, deletePost);
postRouter.get("/:postId", showPost);
postRouter.put("/:postId/like", authMiddleware, likeOnPost);
postRouter.post("/:postId/comment", authMiddleware, postingComments);
postRouter.get("/:postId/comment", fetchCommentsByPostId);
postRouter.delete("/comment/:commentId", authMiddleware, deleteComment);

export default postRouter;
