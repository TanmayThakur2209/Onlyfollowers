import dotenv from "dotenv";
dotenv.config();
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import connectDB from "./config/db.js";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/uploads", express.static("uploads"));


app.use("/api/auth", authRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to start server due to DB error:", err);
});
  