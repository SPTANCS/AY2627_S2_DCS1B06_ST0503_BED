import {
  createTodo,
  updateTodoCompletion,
  findTodoById,
  findTodosByUserId,
  removeTodo,
} from '../models/todoModel.js';
import { AppError } from '../utils/AppError.js';

// Express 5 automatically forwards errors thrown from async controllers.
function requirePositiveId(value, label) {
  const id = Number(value);
  if (typeof value !== 'string' || value.trim() === '' || !Number.isSafeInteger(id) || id <= 0) {
    throw new AppError(400, `Invalid ${label}`);
  }
  return id;
}

// GET /users/:userId/todos
export async function getTodosByUser(req, res) {
  const userId = requirePositiveId(req.params.userId, 'user ID');

  const result = await findTodosByUserId(userId);

  return res.status(200).json(result); // An empty array [] is valid.
}

// GET /todos/:id
export async function getTodoById(req, res) {
  const id = requirePositiveId(req.params.id, 'to-do ID');
  const todo = await findTodoById(id);

  if (todo === null) {
    throw new AppError(404, 'To-do not found');
  }

  return res.status(200).json(todo);
}

// POST /users/:userId/todos
export async function addTodo(req, res) {
  const userId = requirePositiveId(req.params.userId, 'user ID');
  const { title, dueDate: dueDateInput } = req.body ?? {}; // Destructure with default to avoid undefined error if req.body is null or undefined.

  if (typeof title !== 'string' || title.trim() === '') {
    throw new AppError(400, 'Title is required');
  }

  const dueDate = new Date(dueDateInput);

  if (Number.isNaN(dueDate.getTime())) {
    throw new AppError(400, 'Valid due date is required');
  }

  const newTodo = await createTodo({ userId, title, dueDate });

  return res.status(201).json(newTodo);
}

// PATCH /todos/:id
export async function markComplete(req, res) {
  const id = requirePositiveId(req.params.id, 'to-do ID');
  const updated = await updateTodoCompletion(id, true);

  if (updated === null) {
    throw new AppError(404, 'To-do not found');
  }

  return res.status(200).json(updated);
}

// DELETE /todos/:id
export async function deleteTodo(req, res) {
  const id = requirePositiveId(req.params.id, 'to-do ID');
  const deleted = await removeTodo(id);

  if (deleted === null) {
    throw new AppError(404, 'To-do not found');
  }
  
  return res.status(200).json({ message: 'To-do deleted', id: deleted.id });
}
