import express from 'express';
import { editProfile, getProfile, getUsersProfile, toggleFollow } from '../controllers/profile.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

import multer from "multer";
import { storage } from '../config/cloudinary.js';

const upload = multer({storage});
const profileRouter = express.Router();

profileRouter.get("/", authMiddleware ,getProfile);
profileRouter.get("/:username", getUsersProfile);
profileRouter.put("/:profileId/follow", authMiddleware, toggleFollow);
profileRouter.put("/edit", authMiddleware, upload.single("profilePic"), editProfile);

export default profileRouter;