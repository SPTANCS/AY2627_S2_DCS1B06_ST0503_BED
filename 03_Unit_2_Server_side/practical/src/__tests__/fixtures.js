// Shared data and helpers used by every test file.

// These mirror the two product lists defined in index.js.
export const snacks = [
  { id: 1, name: 'Chips', price: 2.99, quantity: 50 },
  { id: 2, name: 'Cookies', price: 3.49, quantity: 30 },
  { id: 3, name: 'Candy Bar', price: 1.25, quantity: 80 },
  { id: 4, name: 'Pretzels', price: 4.49, quantity: 40 },
  { id: 5, name: 'Popcorn', price: 1.99, quantity: 60 },
  { id: 6, name: 'Granola Bar', price: 2.50, quantity: 70 },
  { id: 7, name: 'Trail Mix', price: 5.99, quantity: 25 },
  { id: 8, name: 'Gummy Bears', price: 3.25, quantity: 90 },
  { id: 9, name: 'Beef Jerky', price: 7.99, quantity: 15 },
  { id: 10, name: 'Rice Cakes', price: 3.99, quantity: 35 },
];

export const electronics = [
  { id: 1, name: 'Headphones', price: 29.99, quantity: 20 },
  { id: 2, name: 'USB Cable', price: 9.99, quantity: 100 },
  { id: 3, name: 'Mouse', price: 19.99, quantity: 45 },
  { id: 4, name: 'Keyboard', price: 49.99, quantity: 30 },
  { id: 5, name: 'Webcam', price: 39.99, quantity: 25 },
  { id: 6, name: 'USB Hub', price: 14.99, quantity: 60 },
  { id: 7, name: 'Monitor Stand', price: 24.99, quantity: 15 },
  { id: 8, name: 'HDMI Cable', price: 7.99, quantity: 80 },
  { id: 9, name: 'Power Bank', price: 34.99, quantity: 35 },
  { id: 10, name: 'Phone Charger', price: 12.99, quantity: 90 },
];

// Turns whatever the route sent back into a short, readable string so failure
// messages can show "Got back: ...". Long responses are trimmed.
export function preview(body) {
  let text;
  if (body === undefined) return 'nothing';
  try {
    text = typeof body === 'string' ? body : JSON.stringify(body);
  } catch {
    text = String(body);
  }
  if (text === undefined) return 'nothing';
  if (text === '' || text === '{}') return 'an empty response';
  return text.length > 180 ? text.slice(0, 180) + ' ...' : text;
}

// True if the response looks like "some kind of error message", without caring
// about the exact wording or key. We accept a non-empty string, or an object
// that holds some text (e.g. { error: '...' } or { message: '...' }).
// A plain list is a normal success response, so it does not count as an error.
export function hasErrorMessage(body) {
  if (typeof body === 'string') return body.trim().length > 0;
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false;
  return Object.values(body).some(
    (value) => typeof value === 'string' && value.trim().length > 0
  );
}
