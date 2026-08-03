import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    username:{
        type: String,
        maxlength: 30,
        unique: true,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
    },

    token: {
        type: String,
        default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    }

});

const userModel = mongoose.model("User", userSchema);

export default userModel;