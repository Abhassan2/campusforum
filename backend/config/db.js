import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGODB_STRING);
    console.log("database connected");   
}

export default connectdb;