import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "Profile",
  },
  
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },

  text: {
    type: String,
    maxlength: 200,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
