import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log(`✅ MongoDB connected successfully!`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};
