/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import * as authRouter from './routes/auth';
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to user-api!' });
});

app.get('/api/info', (req, res) => {
  const { age, location } = req.query;
  res.json({
    age: age as string,
    location: location as string
  });
});

app.use(express.json());
app.use("/auth", authRouter.default);
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
