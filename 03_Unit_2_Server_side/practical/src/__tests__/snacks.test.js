import { describe, it, expect } from 'vitest';
import { get } from './http.js';
import { snacks, preview, hasErrorMessage } from './fixtures.js';

// Tests for the GET /snacks route in index.js.

describe('GET /snacks', () => {
  it('returns all 10 snacks in a list', async () => {
    const res = await get('/snacks');
    const ok = Array.isArray(res.body) && res.body.length === 10;
    expect(
      ok,
      `Expected: a list of all 10 snacks\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('each snack has a name and a price', async () => {
    const res = await get('/snacks');
    const first = Array.isArray(res.body) ? res.body[0] : undefined;
    const ok = !!first && typeof first.name === 'string' && typeof first.price === 'number';
    expect(
      ok,
      `Expected: each snack to have a name and a price, like ${preview(snacks[0])}\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('?maxPrice=3 only returns snacks that cost 3 or less', async () => {
    const res = await get('/snacks?maxPrice=3');
    const list = Array.isArray(res.body) ? res.body : [];
    const ok = list.length > 0 && list.every((item) => item.price <= 3);
    expect(
      ok,
      `Expected: only snacks priced 3 or less\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('?sort=asc lists snacks cheapest first', async () => {
    const res = await get('/snacks?sort=asc');
    const prices = Array.isArray(res.body) ? res.body.map((i) => i.price) : [];
    const ok = prices.length === 10 && prices.every((p, i) => i === 0 || p >= prices[i - 1]);
    expect(
      ok,
      `Expected: snacks ordered from cheapest to most expensive\n  Got back prices: ${preview(prices)}`
    ).toBe(true);
  });

  it('?sort=desc lists snacks most expensive first', async () => {
    const res = await get('/snacks?sort=desc');
    const prices = Array.isArray(res.body) ? res.body.map((i) => i.price) : [];
    const ok = prices.length === 10 && prices.every((p, i) => i === 0 || p <= prices[i - 1]);
    expect(
      ok,
      `Expected: snacks ordered from most expensive to cheapest\n  Got back prices: ${preview(prices)}`
    ).toBe(true);
  });

  it('shows an error message when maxPrice is not a number', async () => {
    const res = await get('/snacks?maxPrice=abc');
    expect(
      hasErrorMessage(res.body),
      `Expected: some error message (maxPrice "abc" is not valid)\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('shows an error message when sort is not asc or desc', async () => {
    const res = await get('/snacks?sort=cheapest');
    expect(
      hasErrorMessage(res.body),
      `Expected: some error message (sort must be asc or desc)\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });
});
