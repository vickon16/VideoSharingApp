import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import { createError, createSuccess } from "../utils/handlers.js";

const commentsRouter = express.Router();

// routes that needs authentication/jwt token

// create a Comment
commentsRouter.post("/create", verifyToken, async (req, res, next) => {
  const decodedUserId = req.decodedUserId;

  const newComment = new Comment({
    userId: decodedUserId,
    ...req.body,
  });

  try {
    await newComment.save();
    res
      .status(200)
      .json(createSuccess(newComment, "Comments created successfully"));
  } catch (error) {
    next(error);
  }
});

// delete comment
commentsRouter.delete("/:id", verifyToken, async (req, res, next) => {
  const decodedUserId = req.decodedUserId;
  const id = req.params.id;

  try {
    // find the specific comment
    const comment = await Comment.findById(id);
    if (!comment) throw createError(400, "Comment does not exist");

    // find the video
    const video = await Video.findById(id);
    if (!video) throw createError(400, "Video does not exist");


    // check if we are the owner of the comment or video
    if (decodedUserId !== comment.userId || decodedUserId !== video.userId) {
      throw createError(403, "You can only delete your comment or video");
    }

    await Comment.findByIdAndDelete(id);

    res
      .status(200)
      .json(createSuccess(null, "Comments deleted successfully"));
  } catch (error) {
    next(error);
  }
});

// routes without authentication

// get comment
commentsRouter.get("/find/:videoId", async (req, res, next) => {
  const {videoId} = req.params;
  try {
    const comments = await Comment.find({
      videoId : videoId
    })

    res
      .status(200)
      .json(createSuccess(comments, "Comments Gotten successfully"));
  } catch (error) {
    next(error);
  }
});







export default commentsRouter;