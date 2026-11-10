import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// https://orm.drizzle.team/docs/overview

// An author can have many animes.
export const authors = sqliteTable("authors", {
  id  : integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  bio : text("bio"),
});

// Each anime belongs to one author (authorId points at authors.id).
export const animes = sqliteTable("animes", {
  id      : integer("id").primaryKey({ autoIncrement: true }),
  title   : text("title").notNull(),
  genre   : text("genre"),
  episodes: integer("episodes"),
  authorId: integer("author_id").references(() => authors.id),
});

// books
export const books = sqliteTable("books", {
  id      : integer("id").primaryKey({ autoIncrement: true }),
  title   : text("title").notNull()
});