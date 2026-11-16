import { eq, asc } from "drizzle-orm";
import { db } from "../db/connection.js";
import { todos } from "../db/schema.js";

// Find all todos belonging to a particular user.
export async function findTodosByUserId(userId) {
  const results = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(asc(todos.id));

  // Return an array, possibly empty [].
  return results;
}

// Find a single todo by its ID.
export async function findTodoById(id) {
  const [todo] = await db
    .select()
    .from(todos)
    .where(eq(todos.id, id))
    .limit(1);

  // Return null if no record matches.
  return todo ?? null;
}

// Create a new todo.
export async function createTodo({ userId, title, dueDate }) {
  const [newTodo] = await db
    .insert(todos)
    .values({
      userId,
      title,
      dueDate,
      completed: false
    })
    .returning();

  return newTodo;
}

// Update a todo's completion status.
// Supports both completed = true and false.
export async function updateTodoCompletion(id, completed) {
  const [updated] = await db
    .update(todos)
    .set({ completed })
    .where(eq(todos.id, id))
    .returning();

  // Return null if no record was updated.
  return updated ?? null;
}

// Delete a todo by its ID.
export async function removeTodo(id) {
  const [deleted] = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning();

  // Return null if no record was deleted.
  return deleted ?? null;
}