import { Router } from 'express';
import { UserModel } from './models/user.js';
import { TeamModel } from './models/team.js';
import { ActivityModel } from './models/activity.js';
import { LeaderboardModel } from './models/leaderboard.js';
import { WorkoutModel } from './models/workout.js';

const router = Router();

router.get('/users', async (req, res) => {
  const users = await UserModel.find().limit(50).lean();
  res.json({ data: users });
});

router.post('/users', async (req, res) => {
  const user = await UserModel.create(req.body);
  res.status(201).json({ data: user });
});

router.get('/teams', async (req, res) => {
  const teams = await TeamModel.find().populate('members').lean();
  res.json({ data: teams });
});

router.post('/teams', async (req, res) => {
  const team = await TeamModel.create(req.body);
  res.status(201).json({ data: team });
});

router.get('/activities', async (req, res) => {
  const activities = await ActivityModel.find().populate('user').limit(100).lean();
  res.json({ data: activities });
});

router.post('/activities', async (req, res) => {
  const activity = await ActivityModel.create(req.body);
  res.status(201).json({ data: activity });
});

router.get('/leaderboard', async (req, res) => {
  const leaderboard = await LeaderboardModel.find().sort({ score: -1 }).limit(50).lean();
  res.json({ data: leaderboard });
});

router.post('/leaderboard', async (req, res) => {
  const entry = await LeaderboardModel.create(req.body);
  res.status(201).json({ data: entry });
});

router.get('/workouts', async (req, res) => {
  const workouts = await WorkoutModel.find().populate('user').limit(50).lean();
  res.json({ data: workouts });
});

router.post('/workouts', async (req, res) => {
  const workout = await WorkoutModel.create(req.body);
  res.status(201).json({ data: workout });
});

export default router;
