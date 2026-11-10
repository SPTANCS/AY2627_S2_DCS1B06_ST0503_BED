# DB Seeding — Starter

Your goal: build the `npm run db` command that creates SQLite tables and seeds them with the sample data, using Drizzle ORM. Follow the lesson.

## What's already here

| File | Purpose |
|---|---|
| `index.js` | Express server with `GET /authors` and `GET /animes` (already written) |
| `src/db/seed.js` | The sample data — you add the seeding logic |
| `_extras/tests/seed.test.js` | Tests that pass once the database is seeded |

## What you need to build

1. `package.json` — run `npm init`, add `"type": "module"`, install dependencies, and add the `dev`, `db`, and `test` scripts
2. `src/db/connection.js` — open the SQLite database and export a `db` object
3. `drizzle.config.js` — point the Drizzle CLI at your schema
4. `src/db/schema.js` — define the `authors` and `animes` tables
5. `src/db/seed.js` — add the logic that creates the tables and inserts the sample data

## Getting started

Follow the lesson to set up the project. Once your `package.json` and DB layer are in place:

```bash
npm install       # install dependencies
npm run db        # create and seed the database
npm run db clear  # delete all rows from animes and authors
npm run dev       # start the server
npm test          # check your work — both tests should pass
```

When the server is running:

- [http://localhost:3000/authors](http://localhost:3000/authors) — all authors
- [http://localhost:3000/animes](http://localhost:3000/animes) — all animes
