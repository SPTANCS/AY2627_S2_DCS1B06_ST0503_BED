// ✏️ EDIT THIS FILE — add your own tables below.
// After changing a table, run `npm run db` to recreate the database.

import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';

// An user can have many comments for many hotels.
export const users = sqliteTable('users', {
  user_id: integer('user_id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull(),
  password: text('password').notNull()
});

// A hotel can have many comments by many users.
export const hotels = sqliteTable('hotels', {
  hotel_id: integer('hotel_id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  address: text('address').notNull(),
  image: blob('image')
});

// Each anime belongs to one author (authorId points at authors.id).
export const hotelreviews = sqliteTable('hotelreviews', {
  hotelreview_id: integer('hotelreview_id').primaryKey({ autoIncrement: true }),
  hotel_id: integer('hotel_id').references(() => hotels.hotel_id),
  user_id: integer('user_id').references(() => users.user_id),
  reviews: text('reviews'),
  rating: integer('rating').default(3)
});
