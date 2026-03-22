import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const seed = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);
  await User.create({ email: 'user@epargne.fr', passwordHash });

  console.log('User seeded: user@epargne.fr / password123');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
