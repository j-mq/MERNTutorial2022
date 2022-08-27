import { Schema, model } from "mongoose";

interface IGoal {
  user: Schema.Types.ObjectId;
  text: string;
}

const goalSchema = new Schema<IGoal>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true }
);

export const Goal = model<IGoal>("Goal", goalSchema);
