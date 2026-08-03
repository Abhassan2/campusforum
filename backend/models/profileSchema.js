import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  profilePic: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    maxlength: 150,
    default: "",
  },
  
  gender: {
    type: String,
    enum: ["male", "female", "other", "not to say"],
    default: "not to say",
  },

  dateOfBirth: {
    type: Date,
  },

  followers: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  ],

  following: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  ],

  postsCount: {
    type: Number,
    default: 0,
  },

});

const profileModel = mongoose.model("Profile", profileSchema);

export default profileModel;
