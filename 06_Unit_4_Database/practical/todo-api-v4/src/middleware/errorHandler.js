import { AppError } from '../utils/AppError.js';

// Express error middleware must have four parameters.
export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  // Expected errors: return the status and message specified by the controller.
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  // Unexpected errors: log details, but do not reveal internals to the client.
  console.error('Unexpected application error:', error);
  return res.status(500).json({ error: 'Internal server error' });
}
