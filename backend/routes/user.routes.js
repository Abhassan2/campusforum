import express from 'express';
import { register, login, fetchMe, getSignature } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

// fetch current user profile
userRouter.get("/me", authMiddleware, fetchMe);

userRouter.get("/get-signature",authMiddleware, getSignature);

export default userRouter;