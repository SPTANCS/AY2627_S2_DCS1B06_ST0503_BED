// TODO: import express

// TODO: create the express app and enable JSON body parsing (express.json())

// In-memory data (this is provided for you — do not change it)
const todos = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Build an API", done: false },
  { id: 3, title: "Write some tests", done: true },
  { id: 4, title: "Read the docs", done: false },
  { id: 5, title: "Deploy the app", done: false },
];

const animes = [
  { id: 1, title: "Bleach", episodes: 366 },
  { id: 2, title: "Hunter x Hunter", episodes: 148 },
  { id: 3, title: "Naruto", episodes: 220 },
  { id: 4, title: "One Piece", episodes: 1000 },
  { id: 5, title: "Death Note", episodes: 37 },
];

// Todos

// TODO: GET /todos
// Respond with status 200 and the full todos list as JSON.

// TODO: GET /todos/:id
// Find the todo whose id matches req.params.id (remember req.params.id
// is a string, so convert it to a number), then respond with status 200
// and that todo as JSON.

// TODO: POST /todos
// Build a new todo from req.body, push it onto the todos array, then
// respond with status 201 and the new todo as JSON.

// Animes

// TODO: GET /animes
// Respond with status 200 and the full animes list as JSON.

// TODO: GET /animes/:id
// Find the anime whose id matches req.params.id (convert it to a number),
// then respond with status 200 and that anime as JSON.

// TODO: POST /animes
// Build a new anime from req.body, push it onto the animes array, then
// respond with status 201 and the new anime as JSON.

// TODO: define PORT (e.g. 3000)

// TODO: start the server with app.listen(PORT, ...) and log that it's running

// TODO: export the app as the default export (needed by the tests)
