import express from 'express';

import todoRoutes from './routes/todoRoutes.js'

const app  = express();
const PORT = 3000;

// Lets Express read JSON bodies into req.body on POST and PATCH requests.
app.use(express.json());

// A temporary health check so you can confirm the server is alive.
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Todo API is running' });
});

// Routes
app.use(todoRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});