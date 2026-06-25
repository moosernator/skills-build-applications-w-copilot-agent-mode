import mongoose from 'mongoose';
import { DATABASE_NAME, MONGO_URI } from './config.ts';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB database ${DATABASE_NAME} at ${MONGO_URI}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};
