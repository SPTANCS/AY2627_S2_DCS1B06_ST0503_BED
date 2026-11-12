import express from 'express';

import { db } from './src/db/connection.js';
import { authors, animes } from './src/db/schema.js';

const app = express();

app.get('/authors', async (req, res) => {
  const authorsInDatabase = await db.select().from(authors)
  res.status(200).json(authorsInDatabase);
});

app.get('/animes', async (req, res) => {
  const animesInDatabase = await db.select().from(animes)
  res.status(200).json(animesInDatabase);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));

export default app;
