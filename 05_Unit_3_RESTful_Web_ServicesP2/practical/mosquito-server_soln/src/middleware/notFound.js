// Question 12: catch-all for any request that no route answered.
// It ends the request, so it never calls next().
const notFound = (req, res) => {
  res.status(404).json({
    message: `Bzzt! Mosquito server went splat, nothing found at ${req.originalUrl}`
  });
};

export { notFound };
