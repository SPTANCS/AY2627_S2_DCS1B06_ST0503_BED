// https://orm.drizzle.team/docs/overview

// src/db/schema.js
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  username:  text('username').notNull().unique(),
  email:     text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// One-to-many: one user can have many todos
export const todos = sqliteTable('todos', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  userId:    integer('user_id').notNull().references(() => users.id),
  title:     text('title').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  dueDate:   integer('due_date', { mode: 'timestamp' }),
});

// One-to-one: one user has exactly one profile
export const userProfiles = sqliteTable('user_profiles', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  userId:    integer('user_id').notNull().unique().references(() => users.id),
  bio:       text('bio'),
  avatarUrl: text('avatar_url'),
});

