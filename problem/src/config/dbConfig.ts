import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";

const connectDB = async () => {
  try {
    if (!serverConfig.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    
    await mongoose.connect(serverConfig.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB