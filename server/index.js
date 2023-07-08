import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import videosRouter from "./routes/videos.js";
import commentsRouter from "./routes/comments.js";
import cookieParser from "cookie-parser";
import { createError } from "./utils/handlers.js";
import cors from "cors";
import {corsOptions} from "./corsOption.js"

dotenv.config();
const app = express();

app.use(cors(corsOptions)); // for cross origins
app.use(cookieParser())
app.use(express.json());

let isConnected = false; // track the connection status
const mongoDbURI = process.env.MONGODB_CONNECTION_STRING;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(mongoDbURI, {
      dbName: "Video_Sharing",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

// auth route
app.use("/api/auth", authRouter);

// users route
app.use("/api/users", usersRouter);

// videos route
app.use("/api/videos", videosRouter);

// comments route
app.use("/api/comments", commentsRouter);

// all routes that are not found;
app.all("/api/*", (req, res, next) => {
  res.status(404).json(createError(404, 'Page does not exist'));
  next();
})

// for errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false, status, message,
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectToDB();
  console.log(`...Listening at port ${PORT}...`);
});
