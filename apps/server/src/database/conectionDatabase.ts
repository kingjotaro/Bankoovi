import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './schemas/userModel';

dotenv.config();

export default async function connectToMongoDB() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }
    mongoose.set('strictQuery', true)
    await mongoose.connect(mongoUri ,{serverSelectionTimeoutMS: 30000});
    console.log("Successfully connected to MongoDB");

    await User.ensureIndexes((err) => {
      if (err) {
        console.error('Error creating indexes:', err);
      } else {
        console.log('Indexes created successfully.');
      }
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
