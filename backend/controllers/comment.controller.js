import postModel from "../models/postSchema.js";
import profileModel from "../models/profileSchema.js";
import commentModel from "../models/commentSchema.js";

// sending comments on a post     [completed]
export const postingComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    const isExistPost = await postModel.findById(postId);
    if (!isExistPost)
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

    isExistPost.comments.push(newComment._id);
    await isExistPost.save();

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

    const isExistPost = await postModel.findById(postId);
    if (!isExistPost) {
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

    const post = await postModel.findById(comment.post);
    post.comments.pull(comment._id);
    await post.save();

    await commentModel.findByIdAndDelete(commentId);
    return res.json({ success: true, message: "comment deleted successfully" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};