import express from 'express';
import router from './routes.ts';
import { PORT, API_BASE_URL } from './config.ts';
import { connectDatabase } from './config/database.ts';

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
    await connectDatabase();
  } catch (error) {
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Backend listening on ${API_BASE_URL}`);
  });
};

start();
