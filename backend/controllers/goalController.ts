import asyncHandler from "express-async-handler";
import { Goal } from "../models/goalModel";
import { User } from "../models/userModel";

//@desc   Get goals
//@route  GET /api/goals
//@access Private
export const getGoals = asyncHandler(async (req, res) => {
  if (req.user) {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
  }
});

//@desc   Set goals
//@route  POST /api/goals
//@access Private
export const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text value");
  }
  if (req.user) {
    const goal = await Goal.create({ text: req.body.text, user: req.user.id });
    res.status(200).json(goal);
  }
});

//@desc   Update goal
//@route  PUT /api/goals/:id
//@access Private
export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (req.user) {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    //Make sure the loged in user matches the goal user
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedGoal);
  }
});

//@desc   Delete goal
//@route  GET /api/goals/:id
//@access Private
export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (req.user) {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    //Make sure the loged in user matches the goal user
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await goal.remove();
    res.status(200).json({ id: req.params.id });
  }
});
