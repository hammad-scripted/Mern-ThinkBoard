import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1']);

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import notesRouter from './routes/notesRoutes.js';
import { connectDb } from './config/db.js';
import chalk from 'chalk';
import { rateLimiter } from './middlewares/rateLimiter.js';
const PORT = process.env.PORT || 5001;
const app = express();

// ** MIDDLEWARE **
app.use(express.json());
// // rate limiter
app.use(rateLimiter);
app.use(cors());

// ** ROUTES **
app.use('/api/notes', notesRouter);

connectDb()
  .then((connection) => {
    console.log(chalk.yellow('Database connected'));
    console.log(chalk.bgGreen.black(connection.connection.host));
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(chalk.magenta(`Server running on port ${PORT}`)),
    ),
  )
  .catch((error) => console.log(chalk.red(error)));
