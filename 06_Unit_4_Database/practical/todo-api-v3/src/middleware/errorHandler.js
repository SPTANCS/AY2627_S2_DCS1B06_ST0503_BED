// Centralized Express error-handling middleware.
// The four parameters tell Express that this handles errors.

export function errorHandler(error, req, res, next) {
  // Keep the actual error details on the server, not in the HTTP response.
  console.error('Application error:', error);

  // Let Express handle errors if the response has already started.
  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({ error: 'Internal server error' });
}
