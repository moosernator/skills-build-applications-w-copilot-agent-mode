import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    occurredAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const ActivityModel = model('Activity', activitySchema);
