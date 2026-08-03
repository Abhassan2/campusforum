import jwt from "jsonwebtoken";
import userModel from '../models/userSchema.js';

export const authMiddleware = async (req, res, next) => {
  try {
    
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findOne({ _id: decoded.userId, token });
    if (!user) {
      return res.status(401).json({ success: false, message: "Token not valid in DB" });
    }

    req.user = { id: user._id };
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({success: false, message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid token" })
  }
};
