import { describe, it, expect } from 'vitest';
import { get } from './http.js';
import { preview, hasErrorMessage } from './fixtures.js';

// Tests for the GET /snacks/:id route in index.js.

describe('GET /snacks/:id', () => {
  it('returns the snack whose id is 1', async () => {
    const res = await get('/snacks/1');
    const ok = !!res.body && res.body.id === 1;
    expect(
      ok,
      `Expected: the snack with id 1\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('returns the snack whose id is 3', async () => {
    const res = await get('/snacks/3');
    const ok = !!res.body && res.body.id === 3;
    expect(
      ok,
      `Expected: the snack with id 3\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('shows an error message when the id does not exist', async () => {
    const res = await get('/snacks/999');
    expect(
      hasErrorMessage(res.body),
      `Expected: some error message (there is no snack with id 999)\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });
});
