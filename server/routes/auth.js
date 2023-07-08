import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError, createSuccess } from "../utils/handlers.js";
import { createToken } from "../utils/verifyToken.js";

const authRouter = express.Router();

// create a user
authRouter.post("/signup", async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw createError(401, "User already exists");
    }

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    const token = createToken(newUser?._id)

    res
      .cookie("access_token", token, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry 1day: set to match rT
      })
      .status(201)
      .json(createSuccess(newUser, "Google Signed in successfully", 201));
  } catch (err) {
    next(err);
  }
});

// sign in
authRouter.post("/signin", async (req, res, next) => {
  const { password, email } = req.body;

  try {
    // check if user exists
    let existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      throw createError(404, "User Not Found");
    }

    const token = createToken(existingUser?._id)

    if (existingUser.fromGoogle) {
      res
      .cookie("access_token", token, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry 1day: set to match rT
      })
      .status(200)
      .json(createSuccess(existingUser, "Signed in successfully"));
    }

    // check if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throw createError(401, "Wrong Credentials");
    }

    // remove password from user
    existingUser.password = undefined;

    

    // if everything is correct, set token in cookie
    res
      .cookie("access_token", token, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry 1day: set to match rT
      })
      .status(200)
      .json(createSuccess(existingUser, "Signed in successfully"));
  } catch (err) {
    next(err);
  }
});

authRouter.get("/signout", (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
      })
      .status(200)
      .json(createSuccess(null, "Signed out successfully"));
  } catch (err) {
    next(err);
  }
});

// google authentication
authRouter.post("/google", async (req, res, next) => {
  const { email } = req.body;

  try {
    // check if user exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const token = createToken(existingUser?._id)

      res
        .cookie("access_token", token, {
          httpOnly: true, //accessible only by web server 
          secure: true, //https
          sameSite: 'None', //cross-site cookie 
          maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry 1day: set to match rT
        })
        .status(200)
        .json(createSuccess(existingUser, "Google Signed in successfully"));
    } else {
      // if user doesnt exist, create a new User
      const newUser = new User({ ...req.body, fromGoogle : true });
      await newUser.save();

      const token = createToken(newUser?._id)

      res
        .cookie("access_token", token, {
          httpOnly: true, //accessible only by web server 
          secure: true, //https
          sameSite: 'None', //cross-site cookie 
          maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry 1day: set to match rT
        })
        .status(201)
        .json(createSuccess(newUser, "Google Signed in successfully", 201));
    }
  } catch (err) {
    next(err);
  }
});

export default authRouter;
