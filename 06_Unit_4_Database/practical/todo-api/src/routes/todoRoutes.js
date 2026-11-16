import express from 'express';
import {
  getTodosByUser,
  getTodoById,
  addTodo,
  markComplete,
  deleteTodo,
} from '../controllers/todoController.js';

const router = express.Router();

router.get   ('/users/:userId/todos', getTodosByUser);
router.post  ('/users/:userId/todos', addTodo);

router.get   ('/todos/:id', getTodoById);
router.patch ('/todos/:id', markComplete);
router.delete('/todos/:id', deleteTodo);

export default router;