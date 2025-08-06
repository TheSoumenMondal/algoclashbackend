import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";

export async function connectDB() {
  try {
    await mongoose.connect(serverConfig.MONGODB_URI!);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
