import chalk from 'chalk';
import mongoose from 'mongoose';
import 'dotenv/config';
export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    return connection;
  } catch (error) {
    console.log(chalk.red(error));
    throw error;
  }
};
