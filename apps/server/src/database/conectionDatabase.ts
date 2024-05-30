import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToMongoDB() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }
    await mongoose.connect(mongoUri);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
