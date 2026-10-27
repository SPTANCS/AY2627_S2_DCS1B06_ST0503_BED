import request from 'supertest';
import app from '../index.js';

// A finished route replies in a few milliseconds. If nothing comes back within
// this window, the route almost certainly isn't sending a response yet.
const RESPONSE_TIMEOUT = 1000;

// Small wrapper around supertest. If a route never replies, we stop waiting and
// show a clear message instead of letting the test hang for 5 seconds.
// Usage:  const res = await get('/snacks');
export function get(path) {
  const req = request(app).get(path);

  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      req.abort();
      reject(
        new Error(
          `GET ${path} did not send a response.\n` +
            `  Expected: this route to reply (use res.json(...) in index.js)\n` +
            `  Got back: nothing`
        )
      );
    }, RESPONSE_TIMEOUT);
  });

  return Promise.race([req, timeout]).finally(() => clearTimeout(timer));
}
