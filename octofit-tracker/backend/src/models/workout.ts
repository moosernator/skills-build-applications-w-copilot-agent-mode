import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, default: 0 },
    difficulty: { type: String, default: 'moderate' },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const WorkoutModel = model('Workout', workoutSchema);
