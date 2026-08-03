import { profile } from "console";
import profileModel from "../models/profileSchema.js";
import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary";

// register by user
export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: true, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      username,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });

    newUser.token = token;
    await newUser.save();
    
    const userProfile = new profileModel({ owner: newUser._id });
    await userProfile.save();

    return res.json({success: true, token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// login by user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const isUserExist = await userModel.findOne({ email });
    if (!isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: isUserExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
    await userModel.updateOne({ _id: isUserExist._id }, { token });
    
    return res.cookie("token", token, {
      httponly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 2*24*60*60*1000,
    })
    .json({success: true, token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// fetch me
export const fetchMe = async (req, res)=>{
  try {
    const currentUserProfile = await profileModel.findOne({owner: req.user.id}).populate({
      path: "owner",
      select: "name username",
    });
    
    if(!currentUserProfile){
      return res.status(404).json({success: false, message: "user not found"});
    }
    
    return res.status(200).json({success: true, currentUserProfile})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

// get-signature
export const getSignature = async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = { timestamp, folder: "campusHub" };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return res.json({ signature, timestamp });
  } catch (err) {
    console.error("Signature generation error:", err);
    return res.status(500).json({ error: "Failed to generate signature" });
  }
}