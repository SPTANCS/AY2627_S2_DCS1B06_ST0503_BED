import { describe, it, expect } from 'vitest';
import { get } from './http.js';
import { preview, hasErrorMessage } from './fixtures.js';

// Tests for the GET / route in index.js (the home route).

describe('GET /', () => {
  it('returns both a snacks list and an electronics list', async () => {
    const res = await get('/');
    const ok =
      !!res.body &&
      Array.isArray(res.body.snacks) &&
      Array.isArray(res.body.electronics);
    expect(
      ok,
      `Expected: an object with a "snacks" list and an "electronics" list\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('?category=snacks returns just the snacks list', async () => {
    const res = await get('/?category=snacks');
    const ok = Array.isArray(res.body) && res.body.length === 10;
    expect(
      ok,
      `Expected: just the list of 10 snacks\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('?category=electronics returns just the electronics list', async () => {
    const res = await get('/?category=electronics');
    const ok = Array.isArray(res.body) && res.body.length === 10;
    expect(
      ok,
      `Expected: just the list of 10 electronics\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('?maxPrice=5 keeps only items priced 5 or less in both lists', async () => {
    const res = await get('/?maxPrice=5');
    const s = res.body && Array.isArray(res.body.snacks) ? res.body.snacks : null;
    const e = res.body && Array.isArray(res.body.electronics) ? res.body.electronics : null;
    const ok =
      !!s && !!e &&
      s.every((item) => item.price <= 5) &&
      e.every((item) => item.price <= 5);
    expect(
      ok,
      `Expected: both lists filtered to items priced 5 or less\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('shows an error message for an unknown category', async () => {
    const res = await get('/?category=toys');
    expect(
      hasErrorMessage(res.body),
      `Expected: some error message (category "toys" is not valid)\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });
});
