// These development-only endpoints demonstrate centralized error handling.
import express from 'express';
import { sql } from 'drizzle-orm';
import { db } from '../db/connection.js';
import { AppError } from '../utils/AppError.js';

const router = express.Router();

// GET /test-bad-request => 400 from an AppError
router.get('/test-bad-request', (req, res) => {
  throw new AppError(400, 'Simulated invalid input');
});

// GET /test-not-found => 404 from an AppError
router.get('/test-not-found', (req, res) => {
  throw new AppError(404, 'Simulated missing record');
});

// GET /test-error => unexpected error, sanitized 500
router.get('/test-error', (req, res) => {
  throw new Error('Simulated application failure');
});

// GET /test-db-error => real read-only database error, sanitized 500
router.get('/test-db-error', async (req, res) => {
  await db.run(sql`SELECT * FROM __error_handling_test_missing_table__`);
  return res.json({ message: 'Unexpectedly found test table' });
});

export default router;
