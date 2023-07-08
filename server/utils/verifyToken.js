import jwt from "jsonwebtoken";
import { createError } from "./handlers.js";

export const createToken = (id) => {
  // create a json web token to be used to verify users
  // the id is the unique identifier for the token

  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, 
    {expiresIn : "1d"}
  );

  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    // we assume the user is signed in in other to perform a crud operation
    // if the user is signed in, he already has an access token
    const token = req.cookies.access_token;

    if (!token) throw createError(401, "You are not Unauthenticated");

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err) throw createError(403, "Token is not valid");

      req.decodedUserId = decodedUser.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};
