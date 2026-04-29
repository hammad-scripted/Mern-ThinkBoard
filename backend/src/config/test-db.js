import mongoose from 'mongoose';
import 'dotenv/config';

console.log('Connecting to:', process.env.DATABASE_URL);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('Failed:', err);
    process.exit(1);
  });
