import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import { Types } from "mongoose";

//@desc   Register new user
//@route  POST /api/users
//@access Public
export const registerUser = asyncHandler(async (req: any, res: any) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creare user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  res.json({ message: "Register User" });
});

//@desc   Authenticate user
//@route  POST /api/users/login
//@access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc   Get user data
//@route  GET /api/users/me
//@access Private
export const getMe = asyncHandler(async (req: any, res: any) => {
  res.json({ message: "User data display" });
});

//Generate JWT
const generateJWT = (id: Types.ObjectId) => {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  }
};
