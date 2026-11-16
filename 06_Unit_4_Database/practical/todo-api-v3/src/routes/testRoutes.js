// These routes are for development/testing only.
import express from 'express';
import { sql } from 'drizzle-orm';
import { db } from '../db/connection.js';

const router = express.Router();

// Simulates an unexpected application error.
// GET /test-error
router.get('/test-error', (req, res, next) => {
  next(new Error('Simulated application failure'));
});

// Runs a read-only query against a deliberately non-existent table.
// GET /test-db-error
router.get('/test-db-error', async (req, res, next) => {
  try {
    await db.run(sql`SELECT * FROM __error_handling_test_missing_table__`);
    return res.status(200).json({ message: 'Unexpectedly found test table' });
  } catch (error) {
    next(error);
  }
});

export default router;
