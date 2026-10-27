import { describe, it, expect } from 'vitest';
import { get } from './http.js';
import { preview, hasErrorMessage } from './fixtures.js';

// Tests for the GET /electronics/:id route in index.js.

describe('GET /electronics/:id', () => {
  it('returns the electronic whose id is 1', async () => {
    const res = await get('/electronics/1');
    const ok = !!res.body && res.body.id === 1;
    expect(
      ok,
      `Expected: the electronic with id 1\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('returns the electronic whose id is 5', async () => {
    const res = await get('/electronics/5');
    const ok = !!res.body && res.body.id === 5;
    expect(
      ok,
      `Expected: the electronic with id 5\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('shows an error message when the id does not exist', async () => {
    const res = await get('/electronics/999');
    expect(
      hasErrorMessage(res.body),
      `Expected: some error message (there is no electronic with id 999)\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });
});
