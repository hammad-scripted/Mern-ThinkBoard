import express from 'express';
import notesRouter from './routes/notesRoutes.js';
import { connectDb } from './config/db.js';
import chalk from 'chalk';

const app = express();

app.use(express.json());
app.use('/api/notes', notesRouter);

app.listen(5001, () => {
  console.log(chalk.bgBlueBright.green('Server running on port 5001'));
});

connectDb()
  .then((connection) => {
    console.log(chalk.yellow('Database connected'));
    console.log(chalk.bgGreen(connection.connection.host));
  })
  .catch((error) => console.log(chalk.red(error)));
