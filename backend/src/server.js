import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1']);

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import notesRouter from './routes/notesRoutes.js';
import path from 'node:path';
import { connectDb } from './config/db.js';
import chalk from 'chalk';
import { rateLimiter } from './middlewares/rateLimiter.js';
const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();

// ** MIDDLEWARE **
// // rate limiter

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    }),
  );
}
app.use(express.json());
app.use(rateLimiter);

// ** ROUTES **
app.use('/api/notes', notesRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

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
