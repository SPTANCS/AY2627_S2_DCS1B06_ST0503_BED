import express from 'express';
import reportRoute from './src/routes/reportRoute.js';
import blockRoute from './src/routes/blockRoute.js';

import { requestLogger } from './src/middleware/requestLogger.js';
import { notFound } from './src/middleware/notFound.js';

const app = express();
app.use(express.json());

app.use(requestLogger); // APP level: runs on every request

// --- Report endpoints ---
app.use('/api/reports', reportRoute);

// --- Blocks endpoints ---
app.use('/api/blocks', blockRoute);

// Catch-all: must come AFTER the route mounts, before app.listen
app.use(notFound);

app.listen(3000, () => {
  console.log('Mosquito server running on port 3000');
});
