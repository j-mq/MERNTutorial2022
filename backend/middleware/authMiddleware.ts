import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { IUser, User } from "../models/userModel";
import { Document, Types } from "mongoose";

//Extending the Request interface to receive the user object
declare module "express-serve-static-core" {
  interface Request {
    user:
      | (Document<unknown, any, IUser> &
          IUser & {
            _id: Types.ObjectId;
          })
      | null;
  }
}

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

      req.user = await User.findById(decoded.id).select("-password");

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
