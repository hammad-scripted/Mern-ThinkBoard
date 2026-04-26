import express from 'express';
import notesRouter from './routes/notesRoutes.js';
import chalk from 'chalk';
const app = express();

app.use(express.json());
app.use('/api/notes', notesRouter);

app.listen(5001, () => {
  console.log(chalk.bgBlack.green('Server running on port 5001'));
});
