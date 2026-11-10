// ⚠️ DO NOT MODIFY THIS FILE — it checks that `npm run db` seeded the database.
// These tests will fail until you have built the schema, connection, and seed
// logic and run `npm run db`.

import { eq } from 'drizzle-orm';

import { db } from '../../src/db/connection.js';
import { authors, animes } from '../../src/db/schema.js';

describe('seeded database', () => {
  it('has the author "Eiichiro Oda" in the authors table', async () => {
    const rows = await db.select().from(authors).where(eq(authors.name, 'Eiichiro Oda'));
    expect(rows.length).toBe(1);
  });

  it('has the anime "One Piece" in the animes table', async () => {
    const rows = await db.select().from(animes).where(eq(animes.title, 'One Piece'));
    expect(rows.length).toBe(1);
  });
});
