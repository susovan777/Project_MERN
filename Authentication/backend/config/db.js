import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    // If MONGO_URI is not defined
    if(!config.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in .env')
    }

    await mongoose.connect(config.MONGO_URI);
    console.log('✅ Connected to database successfully!');
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1)
  }
};

export default connectDB;
