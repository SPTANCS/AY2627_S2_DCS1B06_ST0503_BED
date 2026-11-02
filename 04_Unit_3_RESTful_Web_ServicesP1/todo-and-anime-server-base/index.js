// TODO: import express
import express from 'express';

const app = express();

// TODO: create the express app and enable JSON body parsing (express.json())
app.use(express.json());

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
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});


// TODO: GET /todos/:id
// Find the todo whose id matches req.params.id (remember req.params.id
// is a string, so convert it to a number), then respond with status 200
// and that todo as JSON.
app.get('/todos/:id', (req, res) => {

  const todoID = Number(req.params.id);

  let resultTodo;

  // version 1
  // for (let i = 0 ; i <= todos.length ; i++) {
  //   if (todoID == todos[i].id) { // found
  //     resultTodo = todos[i];
  //     break;
  //   }
  // }

  // version 2
  // for (let currentTodoItem of todos) {
  //   if (todoID == currentTodoItem.id) {
  //     resultTodo = currentTodoItem;
  //     break;
  //   }
  // }

  // version 3
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  resultTodo = todos.find(ele => todoID == ele.id );


  res.status(200).json(resultTodo);
});

// TODO: POST /todos
// Build a new todo from req.body, push it onto the todos array, then
// respond with status 201 and the new todo as JSON.
app.post('/todos', (req, res) => {
  const newTodoItem = { 
    id   : todos.length + 1, 
    title: req.body.title, 
    done : req.body.done ?? false
  };

  todos.push(newTodoItem);

  res.status(201).json(newTodoItem);
});



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
const PORT = 3000;

// TODO: start the server with app.listen(PORT, ...) and log that it's running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// TODO: export the app as the default export (needed by the tests)
