import { Schema, model } from "mongoose";

interface IGoal {
  text: string;
}

const goalSchema = new Schema<IGoal>(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true }
);

export const Goal = model<IGoal>("Goal", goalSchema);
