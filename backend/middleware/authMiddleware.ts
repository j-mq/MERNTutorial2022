import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel";

export const protect = asyncHandler(async (req, res, next) => {
  let token: string = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") &&
    process.env.JWT_SECRET
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };
      const user = await User.findById(decoded.id).select("-password");
      //TODO: Add user to the request object. Currently TS doesnt allow it

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
