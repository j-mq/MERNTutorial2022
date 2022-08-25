import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
