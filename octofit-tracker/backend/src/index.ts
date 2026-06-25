import express from 'express';
import mongoose from 'mongoose';
import router from './routes.js';
import { PORT, MONGO_URI, API_BASE_URL } from './config.js';

const app = express();

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send({
    message: 'OctoFit Tracker backend is running.',
    apiBaseUrl: API_BASE_URL,
  });
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Backend listening on ${API_BASE_URL}`);
  });
};

start();
