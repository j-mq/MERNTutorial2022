import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    console.log(
      colors.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

//TODO: Connected to MongoDB!
