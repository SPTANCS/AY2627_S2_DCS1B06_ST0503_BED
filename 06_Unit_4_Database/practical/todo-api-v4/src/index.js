import express from 'express';
import todoRoutes from './routes/todoRoutes.js';
import testRoutes from './routes/testRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

import { loadEnvFile } from "node:process";

loadEnvFile(".env");

const app = express();
const PORT = 3000;

// Parse JSON request bodies for POST and PATCH requests.
app.use(express.json());

// Health check.
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Todo API is running' });
});

// Application routes.
app.use(todoRoutes);

// Test routes must never be exposed in production.
console.log('NODE_ENV:', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(testRoutes);
}

// Register AFTER every route so errors reach this middleware.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
