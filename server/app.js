import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import ItemRoutes from "./routes/ItemRoutes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "https://lost-found-frontend.onrender.com",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", userRoutes);

app.use("/Items", ItemRoutes);

const port = process.env.PORT || 4000;
const db = process.env.DB;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
