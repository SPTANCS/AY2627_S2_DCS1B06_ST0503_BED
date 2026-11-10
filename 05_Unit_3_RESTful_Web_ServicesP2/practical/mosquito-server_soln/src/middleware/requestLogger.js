// Runs for EVERY request in the app
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // without this, the request never reaches the controller
};

export { requestLogger };