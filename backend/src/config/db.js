import 'dotenv/config';
import chalk from 'chalk';
import mongoose from 'mongoose';
export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    return connection;
  } catch (error) {
    console.log(chalk.red('Database connection failed', error));
    process.exit(1);
  }
};
