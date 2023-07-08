import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import { createError, createSuccess } from "../utils/handlers.js";

const videosRouter = express.Router();

// routes that needs authentication/jwt token

// create a video
videosRouter.post("/create", verifyToken, async (req, res, next) => {
  const decodedUserId = req.decodedUserId;

  const newVideo = new Video({
    userId: decodedUserId,
    ...req.body,
  });

  try {
    await newVideo.save();
    res
      .status(200)
      .json(createSuccess(newVideo, "Videos created successfully"));
  } catch (error) {
    next(error);
  }
});

// update a video
videosRouter.put("/:id", verifyToken, async (req, res, next) => {
  const decodedUserId = req.decodedUserId;
  const id = req.params.id;

  try {
    const video = await Video.findById(id);

    if (!video) throw createError(404, "Video not found");

    // check if we are the owner of the video
    if (decodedUserId !== video.userId) {
      throw createError(401, "You can only update your videos");
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(createSuccess(updatedVideo, "Updated successfully"));
  } catch (error) {
    next(error);
  }
});

// update video views
videosRouter.put("/view/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  try {
    const video = await Video.findById(id);
    if (!video) throw createError(400, "Video does not exist");

    const updatedViews = await Video.findByIdAndUpdate(id, {
      $inc : {views : 1}
    })

    res.status(200).json(createSuccess(updatedViews, "View has been increased successfully"));
  } catch (error) {
    next(error);
  }
});

// delete a video
videosRouter.delete("/:id", verifyToken, async (req, res, next) => {
  const decodedUserId = req.decodedUserId;
  const id = req.params.id;

  try {
    const video = await Video.findById(id);
    if (!video) throw createError(400, "Video Already deleted");

    // check if we are the owner of the video
    if (decodedUserId !== video.userId) {
      throw createError(401, "You can only delete your videos");
    }

    await User.findByIdAndDelete(id);
    res.status(200).json(createSuccess(null, "Deleted successfully"));
  } catch (error) {
    next(error);
  }
});

// get subscribedChannels videos
videosRouter.get("/sub", verifyToken, async (req, res, next) => {
  const decodedUserId = req.decodedUserId;

  try {
    // find the current user
    const currentUser = await User.findById(decodedUserId);
    const subscribedChannels = currentUser.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(channelId => {
        return Video.find({userId : channelId})
      })
    )

    const sortedLists = list.flat().sort((a, b) => b.createdAt - a.createdAt)
    

    res.status(200).json(createSuccess(sortedLists, "Channels returned successfully"));
  } catch (error) {
    next(error);
  }
});

// like a video
videosRouter.put("/like/:videoId", verifyToken, async (req, res, next) => {
  const decodedId = req.decodedUserId; // current user Id
  const videoId = req.params.videoId; // videoId to be liked

  try {
    // addToSet makes sure that the id is not duplicated
    // add id to the likes array and pull id from dislikes array;
    const updatedVideos = await Video.findByIdAndUpdate(videoId, {
      $addToSet : {likes : decodedId},
      $pull : {dislikes : decodedId},
      
    }, {new : true});

    res.status(200).json(createSuccess(updatedVideos, "Video Liked successfully"));
  } catch (err) {
    next(err);
  }
});

// dislike a video
videosRouter.put("/dislike/:videoId", verifyToken, async (req, res, next) => {
  const decodedId = req.decodedUserId; // current user Id
  const videoId = req.params.videoId; // videoId to be disliked

  try {
     // addToSet makes sure that the id is not duplicated
    // add id to the dislikes array and pull id from likes array;
    const updatedVideos = await Video.findByIdAndUpdate(videoId, {
      $addToSet : {dislikes : decodedId},
      $pull : {likes : decodedId}
    }, {new : true});

    res.status(200).json(createSuccess(updatedVideos, "Video Disliked successfully"));
  } catch (err) {
    next(err);
  }
});


// routes without authentication;

// get a video
videosRouter.get("/find/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const video = await Video.findById(id);
    if (!video) throw createError(400, "Video does not exist");

    res.status(200).json(createSuccess(video, "Video retrieved successfully"));
  } catch (error) {
    next(error);
  }
});

// get trend videos
videosRouter.get("/trend", async (req, res, next) => {
  try {
    const videos = await Video.find().sort({
      views : -1 //sort by views, where 1 is less viewed videos, -1 is most viewed videos
    })

    res.status(200).json(createSuccess(videos, "Trending videos retrieved successfully"));
  } catch (error) {
    next(error);
  }
});

// get random videos
videosRouter.get("/random", async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{
      $sample : {size : 40}
    }])

    res.status(200).json(createSuccess(videos, "Random videos gotten successfully"));
  } catch (error) {
    next(error);
  }
});

// get videos by tags
videosRouter.get("/tags", async (req, res, next) => {
  const {tags} = req.query
  if (!tags) return next(createError(404, "Tags not found"));

  const tagsArray = tags.split(",") // from tags="py,js,c" to tags=[py, js, c]
  try {
    // checking if the tagsArray is in the each of the Video.tags in the database
    // with a maximum of 20 data
    const videos = await Video.find({
      tags : { $in : tagsArray}
    }).limit(20)

    res.status(200).json(createSuccess(videos, "Tags retrieved successfully"));
  } catch (error) {
    next(error);
  }
});

// get videos by search
videosRouter.get("/search", async (req, res, next) => {
  const {query} = req.query;

  try {
    // matching every title OR desc of video for the search query with regex, 
    // i is case insensitive
    // with a maximum of 40 data
    const videos = await Video.find({
      $or : [
        {title : { $regex : query, $options : "i"}},
        {desc : {$regex : query, $options : "i"}}
      ]
    }).limit(40)

    res.status(200).json(createSuccess(videos, "Un-Subscription successfully"));
  } catch (error) {
    next(error);
  }
});



export default videosRouter;
