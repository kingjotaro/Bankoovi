import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
    
    });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
