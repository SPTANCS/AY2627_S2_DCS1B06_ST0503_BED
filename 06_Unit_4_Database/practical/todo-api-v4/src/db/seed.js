import { execSync } from "child_process";

import { db } from './connection.js';
import { users, todos } from './schema.js';


// Start of seeding process
console.log("Creating tables from schema...");

execSync("npx drizzle-kit push", { stdio: "inherit" });

// Insert one user. We do not supply an id -- autoIncrement gives it id 1.
const todayDate = new Date();

const [alice] = await db
  .insert(users)
  .values({
    username:  'alice',
    email:     'alice@yahoo.com',
    createdAt: todayDate,
  })
  .returning();

// Insert two to-dos belonging to that user.
const dueDate = new Date(); // Current date and time
dueDate.setDate(dueDate.getDate() + 7); // Add 7 days

await db.insert(todos).values([
  { userId: alice.id, title: 'Buy groceries', completed: false, dueDate: dueDate },
  { userId: alice.id, title: 'Finish report', completed: true, dueDate: dueDate  },
]);

console.log('Seed data inserted.');