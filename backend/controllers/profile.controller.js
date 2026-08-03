import postModel from "../models/postSchema.js";
import profileModel from "../models/profileSchema.js";
import userModel from "../models/userSchema.js";

// get current user profile [completed]
export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const profile = await profileModel.findOne({ owner: id }).populate({
      path: "owner",
      select: "name username",
    });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "User's profile not found" });
    }

    const userPosts = await postModel.find({ owner: profile._id });
    return res.status(200).json({ success: true, profile, userPosts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// edit current user profile  [completed]
export const editProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { bio, name, username, gender, dateOfBirth } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    if (name === "") {
      user.name = user.name;
    } else {
      user.name = name;
    }
    if (username === "") {
      user.username = user.username;
    } else {
      user.username = username;
    }

    const updatedProfile = await profileModel.findOne({ owner: id }).populate({
      path: "owner",
      select: "name username",
    });

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    if (bio) updatedProfile.bio = bio;
    if (gender === "") {
      updatedProfile.gender = updatedProfile.gender || "not to say";
    } else {
      updatedProfile.gender = gender;
    }

    if (dateOfBirth === "") {
      updatedProfile.dateOfBirth = updatedProfile.dateOfBirth;
    } else {
      updatedProfile.dateOfBirth = dateOfBirth;
    }

    if (req.file && req.file.path) updatedProfile.profilePic = req.file.path;
    await user.save();
    await updatedProfile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// get users profile      [completed]
export const getUsersProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const isUserExist = await userModel.findOne({ username });
    if (!isUserExist) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const userProfile = await profileModel
      .findOne({ owner: isUserExist._id })
      .populate({
        path: "owner",
        select: "name username",
      });
    if (!userProfile) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const userPosts = await postModel.find({ owner: userProfile._id });
    return res.json({ success: true, profile: userProfile, posts: userPosts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// follow/unfollow
export const toggleFollow = async (req, res) => {
  try {
    const { profileId } = req.params;
    const currentUserId = req.user.id;
    
    const currentUserProfile = await profileModel.findOne({ owner: currentUserId });

    const alreadyFollowed = currentUserProfile.following.includes(profileId);
    if (alreadyFollowed) {
      await profileModel.findByIdAndUpdate(currentUserProfile._id, { $pull: { following: profileId } });
      await profileModel.findByIdAndUpdate(profileId, { $pull: { followers: currentUserProfile._id } });
      return res.status(200).json({ success: true, message: "Unfollowed successfully" });
    } else {
      await profileModel.findByIdAndUpdate(currentUserProfile._id, { $addToSet: { following: profileId } });
      await profileModel.findByIdAndUpdate(profileId, { $addToSet: { followers: currentUserProfile._id } });
      return res.json({ success: true, message: "Followed successfully" });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
