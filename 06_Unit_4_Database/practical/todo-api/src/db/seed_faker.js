
// npm install -D @faker-js/faker

// src/db/seed_faker.js

import { execSync } from "node:child_process";
import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";

import { db } from "./connection.js";
import { users, todos } from "./schema.js";

// Number of records to generate
const NUM_USERS = 5;
const TODOS_PER_USER = 3;

// Fixed seed to reproduce the same random values
faker.seed(123);

// Sample todo titles
const todoTitles = [
  "Complete JavaScript assignment",
  "Prepare for programming test",
  "Revise database concepts",
  "Finish project documentation",
  "Submit weekly reflection",
  "Attend project meeting",
  "Study Drizzle ORM",
  "Review lecture notes",
  "Complete online tutorial",
  "Prepare presentation slides"
];

// Generate a random due date within the next 14 days.
// Returns a JavaScript Date object.
function generateDueDate() {
  return faker.date.soon({ days: 14 });
}

// Start the seeding process
async function seed() {
  try {
    console.log("Dropping existing tables...");

    // DROP TABLE removes all data and resets
    // the AUTOINCREMENT counter.
    //
    // Drop child tables before the parent table
    // because they contain foreign keys to users.
    await db.run(sql`DROP TABLE IF EXISTS todos`);
    await db.run(sql`DROP TABLE IF EXISTS user_profiles`);
    await db.run(sql`DROP TABLE IF EXISTS users`);

    console.log("Recreating tables from schema...");

    // Drizzle Kit recreates the tables based on schema.js
    execSync("npx drizzle-kit push", {
      stdio: "inherit"
    });

    console.log("Generating sample data...");

    let totalTodos = 0;

    // Create 5 users
    for (let i = 0; i < NUM_USERS; i++) {

      // Generate a random full name
      const username = faker.person.fullName();

      // Convert spaces to underscores and append a number
      // to ensure unique email addresses.
      const email = `${username.replaceAll(" ", "_").toLowerCase()}_${i + 1}@example.com`;

      // Insert user and retrieve the generated ID
      const [newUser] = await db
        .insert(users)
        .values({
          username: username,
          email: email,
          createdAt: new Date()
        })
        .returning();

      console.log(
        `Created user: ${newUser.username} (ID: ${newUser.id})`
      );

      // Randomly select 3 different todo titles
      const selectedTitles = faker.helpers
        .shuffle([...todoTitles])
        .slice(0, TODOS_PER_USER);

      // Generate 3 todos for the current user
      const userTodos = selectedTitles.map((title) => {
        return {
          userId: newUser.id,
          title: title,
          completed: faker.datatype.boolean(),
          dueDate: generateDueDate()
        };
      });

      // Insert all 3 todos together
      const insertedTodos = await db
        .insert(todos)
        .values(userTodos)
        .returning();

      totalTodos += insertedTodos.length;

      // Display inserted records, including their IDs
      for (const todo of insertedTodos) {
        console.log(
          `  Todo ID: ${todo.id} | ` +
          `Title: ${todo.title} | ` +
          `Completed: ${todo.completed}`
        );
      }
    }

    console.log("\nSeeding completed successfully!");
    console.log(`Total users created: ${NUM_USERS}`);
    console.log(`Total todos created: ${totalTodos}`);

  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  }
}

await seed();
