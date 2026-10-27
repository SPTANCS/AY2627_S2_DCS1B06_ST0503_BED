// Runs once before all tests and prints a short guide for students.

export default function () {
  const line = '='.repeat(60);
  console.log(`
${line}
  Shopping Server tests
${line}
  These tests check the routes in index.js.
  When a test fails it shows two lines:
    - Expected: what the route should do
    - Got back: what your route actually returned

  Fix each route until its tests pass. Suggested order:
    1. GET /snacks
    2. GET /snacks/:id
    3. GET /electronics
    4. GET /electronics/:id
    5. GET /

  Tip: run "npm run test:watch" to re-run automatically as you save.
${line}
`);
}
