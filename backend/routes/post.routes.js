import express from "express";
import {
  uploadPost,
  deletePost,
  getAllPosts,
  showPost,
  likeOnPost,
  uploadingPost,
} from "../controllers/post.controller.js";
import { postingComments, fetchCommentsByPostId, deleteComment } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({storage});
const postRouter = express.Router();


// postRouter.post("/", authMiddleware, upload.single("file"), uploadPost);
postRouter.get("/", getAllPosts);
postRouter.post("/", authMiddleware, uploadingPost);
postRouter.delete("/:postId", authMiddleware, deletePost);
postRouter.get("/:postId", showPost);
postRouter.put("/:postId/like", authMiddleware, likeOnPost);
postRouter.post("/:postId/comment", authMiddleware, postingComments);
postRouter.get("/:postId/comment", fetchCommentsByPostId);
postRouter.delete("/comment/:commentId", authMiddleware, deleteComment);

export default postRouter;
