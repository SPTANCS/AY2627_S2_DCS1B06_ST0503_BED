// ✏️ EDIT THIS FILE — add seed data for your own tables below.
//
// Run with: npm run db
// This makes sure the tables from schema.js exist, then seeds each table if it's empty.

import { execSync } from 'child_process';

import { db } from './connection.js';
import { users, hotels, hotelreviews } from './schema.js';

import * as fs from 'node:fs';

// --- Seed data ---

const buffer1 = fs.readFileSync("./db/images/hotel1.jpg");
const buffer2 = fs.readFileSync("./db/images/hotel2.jpg");
const buffer3 = fs.readFileSync("./db/images/hotel3.jpg");
const buffer4 = fs.readFileSync("./db/images/hotel4.jpg");

const sampleHotels = [
  { name: 'Hotel California', address: 'Somewhere in California', image: buffer1},
  { name: 'Hotel Florida', address: 'Somewhere in Florida', image: buffer2},
  { name: 'Hotel Texas', address: 'Somewhere in Texas', image: buffer3},
  { name: 'Hotel Idaho', address: 'Somewhere in Idaho', image: buffer4}
];

const sampleUsers = [
  { username: 'hello@gmail.com', password: 'hello'},
  { username: 'yoyoyo@gmail.com', password: 'yoyoyo'}
];

// --- Set up the database ---

// 1. Create the tables from schema.js (only creates what doesn't exist yet).
console.log('Creating tables from schema...');
execSync('npx drizzle-kit push', { stdio: 'inherit' });

// 2. Delete all rows in hotels and users table.
await db.delete(hotelreviews);
await db.delete(hotels);
await db.delete(users);

// 3. Seed hotels if the hotels table is empty.
const existingHotels = await db.select().from(hotels);

if (existingHotels.length === 0) {
  await db.insert(hotels).values(sampleHotels);
  console.log(`Inserted ${sampleHotels.length} hotels.`);
} else {
  console.log('Hotels already seeded.');
}

// 4. Seed users if the users table is empty.
const existingUsers = await db.select().from(users);

if (existingUsers.length === 0) {
  await db.insert(users).values(sampleUsers);
  console.log(`Inserted ${sampleUsers.length} users.`);
} else {
  console.log('Users already seeded.');
}

console.log('Done! Database is ready.');
