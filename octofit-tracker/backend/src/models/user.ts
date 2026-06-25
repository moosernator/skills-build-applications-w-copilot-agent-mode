import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const UserModel = model('User', userSchema);
