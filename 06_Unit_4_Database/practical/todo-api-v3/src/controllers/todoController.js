import {
  createTodo,
  updateTodoCompletion,
  findTodoById,
  findTodosByUserId,
  removeTodo,
} from '../models/todoModel.js';

// GET /users/:userId/todos
export async function getTodosByUser(req, res, next) {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const result = await findTodosByUserId(userId);
    return res.status(200).json(result); // [] is valid when no todos exist.
  } catch (error) {
    next(error); // Forward unexpected errors to errorHandler.
  }
}

// GET /todos/:id
export async function getTodoById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid to-do ID' });
    }

    const todo = await findTodoById(id);
    if (todo === null) {
      return res.status(404).json({ error: 'To-do not found' });
    }

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

// POST /users/:userId/todos
export async function addTodo(req, res, next) {
  try {
    const userId = Number(req.params.userId);
    const { title, dueDate: dueDateInput } = req.body ?? {};
    const dueDate = new Date(dueDateInput);

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (Number.isNaN(dueDate.getTime())) {
      return res.status(400).json({ error: 'Valid due date is required' });
    }

    const newTodo = await createTodo({ userId, title, dueDate });
    return res.status(201).json(newTodo);
  } catch (error) {
    next(error); // Do not respond here; the central handler does that.
  }
}

// PATCH /todos/:id
export async function markComplete(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid to-do ID' });
    }

    const updated = await updateTodoCompletion(id, true);
    if (updated === null) {
      return res.status(404).json({ error: 'To-do not found' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

// DELETE /todos/:id
export async function deleteTodo(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid to-do ID' });
    }

    const deleted = await removeTodo(id);
    if (deleted === null) {
      return res.status(404).json({ error: 'To-do not found' });
    }

    return res.status(200).json({ message: 'To-do deleted', id: deleted.id });
  } catch (error) {
    next(error);
  }
}
