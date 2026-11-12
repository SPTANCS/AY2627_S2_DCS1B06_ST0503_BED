// This file holds the sample data. Your job is to turn it into a working
// `npm run db` command that creates the tables and inserts this data.
import { execSync } from 'child_process';

import { db } from './connection.js';
import { authors, animes } from './schema.js';


// --- Seed data ---

const sampleAuthors = [
  { name: 'Eiichiro Oda', bio: 'Creator of One Piece.' },
  { name: 'Hajime Isayama', bio: 'Creator of Attack on Titan.' },
  { name: 'Akira Toriyama', bio: 'Creator of Dragon Ball and Dr. Slump.' },
];

// `author` is the author name; swap it for the real authorId before inserting.
const sampleAnimes = [
  { title: 'One Piece', genre: 'Adventure', episodes: 1000, author: 'Eiichiro Oda' },
  { title: 'One Piece Film: Red', genre: 'Adventure', episodes: 1, author: 'Eiichiro Oda' },
  { title: 'Attack on Titan', genre: 'Action', episodes: 25, author: 'Hajime Isayama' },
  { title: 'Attack on Titan: Final Season', genre: 'Action', episodes: 28, author: 'Hajime Isayama' },
  { title: 'Dragon Ball', genre: 'Action', episodes: 153, author: 'Akira Toriyama' },
  { title: 'Dragon Ball Z', genre: 'Action', episodes: 291, author: 'Akira Toriyama' },
  { title: 'Dragon Ball GT', genre: 'Action', episodes: 64, author: 'Akira Toriyama' },
  { title: 'Dragon Ball Super', genre: 'Action', episodes: 131, author: 'Akira Toriyama' },
  { title: 'Dr. Slump', genre: 'Comedy', episodes: 243, author: 'Akira Toriyama' },
  { title: 'Sand Land', genre: 'Adventure', episodes: 13, author: 'Akira Toriyama' },
];

// TODO: create the tables, then seed sampleAuthors and sampleAnimes below.

console.log('Creating tables from schema...');
execSync('npx drizzle-kit push', { stdio: 'inherit' });

const existingAuthors = await db.select().from(authors);

if (existingAuthors.length === 0) {
  await db.insert(authors).values(sampleAuthors);
  console.log(`Inserted ${sampleAuthors.length} authors`);
} else {
  console.log('Authors already seeded, skipping.');
}

const existingAnimes = await db.select().from(animes);

if (existingAnimes.length === 0) {
  const allAuthors = await db.select().from(authors);

  const animeRows = sampleAnimes.map((anime) => {
    const author = allAuthors.find((a) => a.name === anime.author);
    return {
      title: anime.title,
      genre: anime.genre,
      episodes: anime.episodes,
      authorId: author.id,
    };
  });

  await db.insert(animes).values(animeRows);
  console.log(`Inserted ${animeRows.length} animes`);
} else {
  console.log('Animes already seeded, skipping.');
}

console.log('Done! Database is ready.');

