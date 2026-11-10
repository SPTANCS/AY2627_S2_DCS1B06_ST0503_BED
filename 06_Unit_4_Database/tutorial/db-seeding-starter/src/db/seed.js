// This file holds the sample data. Your job is to turn it into a working
// `npm run db` command that creates the tables and inserts this data.

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
