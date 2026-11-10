import express from 'express';
import { vi } from 'vitest';

/**
 * Builds a fresh Express app from the student's own modules, wiring up only
 * the pieces a given section needs. This mirrors how index.js mounts things,
 * without importing index.js itself — so:
 *
 *   1. Each section's test only imports files that exist by that section,
 *      which lets `npm run test:N` pass as soon as section N is finished.
 *   2. The lesson never asks students to `export` the app from index.js, so
 *      we must not depend on that.
 *
 * vi.resetModules() clears the module cache first, so src/data/store.js is
 * re-evaluated and the in-memory arrays are re-seeded on every call. That
 * keeps tests that POST or PUT isolated from one another.
 *
 * The imports use RELATIVE specifiers, which the ES module loader resolves
 * against this file's URL. That is cross-platform (Windows, macOS, Linux).
 */
export async function makeApp({
  logger = false,
  reports = false,
  blocks = false,
  notFound = false
} = {}) {
  vi.resetModules();

  const app = express();
  app.use(express.json());

  if (logger) {
    const { requestLogger } = await import('../../src/middleware/requestLogger.js');
    app.use(requestLogger);
  }

  if (reports) {
    const { default: reportRoute } = await import('../../src/routes/reportRoute.js');
    app.use('/api/reports', reportRoute);
  }

  if (blocks) {
    const { default: blockRoute } = await import('../../src/routes/blockRoute.js');
    app.use('/api/blocks', blockRoute);
  }

  if (notFound) {
    const { notFound: notFoundHandler } = await import('../../src/middleware/notFound.js');
    app.use(notFoundHandler);
  }

  return app;
}
