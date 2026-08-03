import postModel from "../models/postSchema.js";
import userModel from "../models/userSchema.js";
import commentModel from "../models/commentSchema.js";
import profileModel from "../models/profileSchema.js";

// user uploads their post    [completed]
export const uploadPost = async (req, res) => {
  try {
    const { path, mimetype } = req.file;
    const { caption } = req.body;

    const media = [{ url: path, type: mimetype }];
    const userProfile = await profileModel.findOne({ owner: req.user.id });

    const newPost = await postModel({
      owner: userProfile._id,
      media,
      caption,
    });
    await newPost.save();
    return res.json({ success: true, message: "Successfully post" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// save post's url in db    [completed]
export const uploadingPost = async (req, res) => {
  try {
    const { file_url, file_type, caption } = req.body;

    const media = [{ url: file_url, type: file_type }];
    const userProfile = await profileModel.findOne({ owner: req.user.id });

    const newPost = await postModel({
      owner: userProfile._id,
      media,
      caption,
    });
    await newPost.save();

    return res.json({ success: true, message: "Successfully post" });
  } catch (error) {
    console.log("server error: ", error);
    return res.status(500).json({ message: error.message });
  }
};

// show post on click       [completed]
export const showPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postModel.findById(postId).populate({
      path: "owner",
      select: "profilePic",
      populate: {
        path: "owner",
        select: "name username",
      },
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    
    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// user deletes their post         [completed]
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const userProfile = await profileModel.findOne({ owner: req.user.id });
    if (post.owner.toString() !== userProfile._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "You'r not owner" });
    }

    await postModel.findByIdAndDelete(postId);
    return res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// get all posts to show as feed      [completed]
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .populate({
        path: "owner",
        select: "profilePic",
        populate: {
          path: "owner",
          select: "name username",
        },
      })
      .sort({ createdAt: -1 });
    const comments = await commentModel.find({});

    return res.status(200).json({ success: true, posts, comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// sending comments on a post     [completed]
export const postingComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    const existingPost = await postModel.findById(postId);
    if (!existingPost)
      return res.json({
        success: false,
        message: "Post not found during comment",
      });
    const userProfile = await profileModel.findOne({ owner: req.user.id });

    const newComment = new commentModel({
      author: userProfile._id,
      post: postId,
      comment: comment,
    });
    await newComment.save();

    return res.json({ success: true, message: "comment uploaded" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// fetch comments by their postId       [completed]
export const fetchCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const existingPost = await postModel.findById(postId);
    if (!existingPost) {
      return res.json({
        success: false,
        message: "Post not found",
      });
    }

    const comments = await commentModel
      .find({ post: postId })
      .populate({
        path: "author",
        select: "profilePic",
        populate: {
          path: "owner",
          select: "username",
        },
      })
      .sort({ createdAt: -1 });

    return res.json({ success: true, comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// delete comment by comments's owner     [completed]
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.json({ success: false, message: "comment not found" });
    }

    const userProfile = await profileModel.findOne({ owner: req.user.id });

    if (comment.author._id.toString() !== userProfile._id.toString()) {
      return res.json({ success: false, message: "you'r not comment owner" });
    }

    await commentModel.findByIdAndDelete(commentId);
    return res.json({ success: true, message: "comment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// like on post       [completed]
export const likeOnPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const userProfile = await profileModel.findOne({ owner: req.user.id });
    if (!userProfile) {
      return res.json({ success: false, message: "User profile not found" });
    }

    const existingPost = await postModel.findById(postId);
    if (!existingPost) {
      return res.json({ success: false, message: "Post not exist" });
    }

    const alreadyLiked = existingPost.likes.includes(userProfile._id);
    if (alreadyLiked) {
      await postModel.findByIdAndUpdate(
        postId,
        { $pull: { likes: userProfile._id } },
        { new: true },
      );
    } else {
      await postModel.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userProfile._id } },
        { new: true },
      );
    }

    return res.json({ success: true, message: "Like updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
