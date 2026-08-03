import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },

  media: [
    {
      url: { 
        type: String, 
        required: true 
        
      },
      type: { 
        type: String, 
        required: true 
        
      }
    },
  ],

  caption: {
    type: String,
    maxlength: 300,
    default: "",
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("Post", postSchema);

export default postModel;
