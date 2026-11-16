import { db }    from '../db/connection.js';
import { todos } from '../db/schema.js';
import { eq }    from 'drizzle-orm';

// GET /users/:userId/todos
export async function getTodosByUser(req, res) {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const result = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId));

  return res.status(200).json(result);
}

// GET /todos/:id
export async function getTodoById(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid to-do ID' });
  }

  const [todo] = await db
    .select()
    .from(todos)
    .where(eq(todos.id, id));

  if (!todo) {
    return res.status(404).json({ error: 'To-do not found' });
  }

  return res.status(200).json(todo);
}

// POST /users/:userId/todos
export async function addTodo(req, res) {
  const userId = parseInt(req.params.userId);
  let { title, dueDate } = req.body;

  dueDate = new Date(dueDate);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (isNaN(dueDate.getTime())) {
    return res.status(400).json({ error: 'Due Date is required' });
  }

  try {
    const [newTodo] = await db
      .insert(todos)
      .values({ userId, title, dueDate, completed: false })
      .returning();

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// PATCH /todos/:id
export async function markComplete(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid to-do ID' });
  }

  const [updated] = await db
    .update(todos)
    .set({ completed: true })
    .where(eq(todos.id, id))
    .returning();

  if (!updated) {
    return res.status(404).json({ error: 'To-do not found' });
  }

  return res.status(200).json(updated);
}

// DELETE /todos/:id
export async function deleteTodo(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid to-do ID' });
  }

  const [deleted] = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning();

  if (!deleted) {
    return res.status(404).json({ error: 'To-do not found' });
  }

  return res.status(200).json({ message: 'To-do deleted', id: deleted.id });
}