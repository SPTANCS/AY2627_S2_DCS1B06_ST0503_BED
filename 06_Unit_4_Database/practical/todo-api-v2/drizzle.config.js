// drizzle.config.js  (create this in the todo-api root, next to package.json)
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema:    './src/db/schema.js',
  dialect:   'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./todos.db',
  },
});