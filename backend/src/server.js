import express from 'express';
import notesRouter from './routes/notesRoutes.js';
import { connectDb } from './config/db.js';
import chalk from 'chalk';
const PORT = process.env.PORT || 5001;
const app = express();

connectDb()
  .then((connection) => {
    console.log(chalk.yellow('Database connected'));
    console.log(chalk.bgGreen(connection.connection.host));
  })
  .catch((error) => console.log(chalk.red(error)));

// ** MIDDLEWARE **
app.use(express.json());
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(chalk.bgBlueBright.green(`Server running on port ${PORT}`));
});
