import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createError, createSuccess } from "../utils/handlers.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

const usersRouter = express.Router();

// get a user
usersRouter.get("/find/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) throw createError(404, "User does not exist");

    res.status(200).json(createSuccess(user, "User data gotten"));
  } catch (err) {
    next(err);
  }
});

// update user
usersRouter.put("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  try {
    // compare user id with jwt id to verify that a particular user is making an update
    if (id !== req.decodedUserId)
      throw createError(403, "You can update only your account!");

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(createSuccess(updatedUser, "User updated successfully"));
  } catch (err) {
    next(err);
  }
});

// delete user
usersRouter.delete("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  try {
    // compare user id with jwt id to verify that a particular user is making an delete
    if (id !== req.decodedUserId)
      throw createError(403, "You can delete only your account!");

    const user = await User.findById(id);

    if (!user) throw createError(400, "User Already deleted");

    await User.findByIdAndDelete(id);

    res.status(200).json(createSuccess(null, "User deleted successfully"));
  } catch (err) {
    next(err);
  }
});

// subscribe a user
usersRouter.put("/sub/:id", verifyToken, async (req, res, next) => {
  const decodedId = req.decodedUserId; // current user Id
  const id = req.params.id; // user id to be subscribed

  try {
    // find the currentUser
    const user = await User.findById(decodedId);
    const user1 = await User.findById(id)

    if (!user || !user1) {
      throw createError(404, "user not found");
    }

    if(user.subscribedUsers.includes(id)) {
      throw createError(403, "You are already subscribed to this user");
    }
    // addToSet is a method to avoid duplication of id's
    await User.findByIdAndUpdate(decodedId, {
      $addToSet: { subscribedUsers: id },
    }, {new : true});

    // find the subscribed user and increase his number of subscribers
    await User.findByIdAndUpdate(id, {
      $inc: { subscribers: 1 },
    }, {new : true});

    res.status(200).json(createSuccess(null, "Subscription successful"));
  } catch (err) {
    next(err);
  }
});

// unsubscribe a user
usersRouter.put("/unsub/:id", verifyToken, async (req, res, next) => {
  const decodedId = req.decodedUserId; // current user Id
  const id = req.params.id; // user id to be subscribed

  try {
    // find current user info and add subscribed user to his list
    const user = await User.findById(decodedId);
    const user1 = await User.findById(id)

    if (!user || !user1) {
      throw createError(404, "user not found");
    }

    await User.findByIdAndUpdate(decodedId, {
      $pull: { subscribedUsers: id },
    }, {new : true});

    // find the subscribed user and increase his number of subscribers
    await User.findByIdAndUpdate(id, {
      $inc: { subscribers: -1 },
    }, {new : true});

    res.status(200).json(createSuccess(null, "Un-Subscription successfully"));
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
