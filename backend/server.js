import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectdb from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";
import postRouter from "./routes/post.routes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRouter);
app.use("/api/user/profile", profileRouter);
app.use("/api/user/post", postRouter);


const start = async () => {
  await connectdb();
    // server listening
  const PORT = 4040;
  app.listen(PORT, () => {
    console.log(`server running at Port ${PORT}`);
  });
};
start();
