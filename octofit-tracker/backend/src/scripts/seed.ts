import mongoose from 'mongoose';
import { MONGO_URI } from '../config.ts';
import { UserModel } from '../models/user.ts';
import { TeamModel } from '../models/team.ts';
import { ActivityModel } from '../models/activity.ts';
import { WorkoutModel } from '../models/workout.ts';
import { LeaderboardModel } from '../models/leaderboard.ts';

/**
 * Seed the octofit_db database with test data.
 */
const seed = async () => {
  await mongoose.connect(MONGO_URI);

  console.log('Connected to MongoDB for seeding:', MONGO_URI);

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
  ]);

  const users = await UserModel.create([
    { username: 'athena', email: 'athena@octofit.com', role: 'admin' },
    { username: 'mason', email: 'mason@octofit.com', role: 'user' },
    { username: 'sierra', email: 'sierra@octofit.com', role: 'user' },
  ]);

  const teams = await TeamModel.create([
    { name: 'Core Crushers', members: [users[0]._id, users[1]._id] },
    { name: 'Trail Blazers', members: [users[2]._id] },
  ]);

  const activities = await ActivityModel.create([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 45,
      caloriesBurned: 410,
      occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
      user: users[1]._id,
      type: 'Cycling',
      durationMinutes: 60,
      caloriesBurned: 520,
      occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      durationMinutes: 50,
      caloriesBurned: 190,
      occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
    },
  ]);

  const workouts = await WorkoutModel.create([
    {
      user: users[0]._id,
      title: 'HIIT Cardio Blast',
      description: 'Rapid intervals to improve endurance and burn calories.',
      durationMinutes: 30,
      difficulty: 'hard',
    },
    {
      user: users[1]._id,
      title: 'Strength Circuit',
      description: 'Full body strength training with light weights.',
      durationMinutes: 40,
      difficulty: 'moderate',
    },
    {
      user: users[2]._id,
      title: 'Recovery Flow',
      description: 'Gentle mobility and stretching session.',
      durationMinutes: 25,
      difficulty: 'easy',
    },
  ]);

  const leaderboardEntries = await LeaderboardModel.create([
    { user: users[0]._id, score: 980, rank: 1 },
    { user: users[1]._id, score: 850, rank: 2 },
    { user: users[2]._id, score: 760, rank: 3 },
  ]);

  console.log('Seed the octofit_db database with test data');
  console.log({
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    workouts: workouts.length,
    leaderboardEntries: leaderboardEntries.length,
  });

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB after seeding.');
};

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
