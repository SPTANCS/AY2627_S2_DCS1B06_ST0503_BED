import { describe, it, expect } from 'vitest';
import { get } from './http.js';
import { electronics, preview, hasErrorMessage } from './fixtures.js';

// Tests for the GET /electronics route in index.js.

describe('GET /electronics', () => {
  it('returns all 10 electronics in a list', async () => {
    const res = await get('/electronics');
    const ok = Array.isArray(res.body) && res.body.length === 10;
    expect(
      ok,
      `Expected: a list of all 10 electronics\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('each electronic has a name and a price', async () => {
    const res = await get('/electronics');
    const first = Array.isArray(res.body) ? res.body[0] : undefined;
    const ok = !!first && typeof first.name === 'string' && typeof first.price === 'number';
    expect(
      ok,
      `Expected: each electronic to have a name and a price, like ${preview(electronics[0])}\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('?maxPrice=20 only returns electronics that cost 20 or less', async () => {
    const res = await get('/electronics?maxPrice=20');
    const list = Array.isArray(res.body) ? res.body : [];
    const ok = list.length > 0 && list.every((item) => item.price <= 20);
    expect(
      ok,
      `Expected: only electronics priced 20 or less\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('?sort=asc lists electronics cheapest first', async () => {
    const res = await get('/electronics?sort=asc');
    const prices = Array.isArray(res.body) ? res.body.map((i) => i.price) : [];
    const ok = prices.length === 10 && prices.every((p, i) => i === 0 || p >= prices[i - 1]);
    expect(
      ok,
      `Expected: electronics ordered from cheapest to most expensive\n  Got back prices: ${preview(prices)}`
    ).toBe(true);
  });

  it('?sort=desc lists electronics most expensive first', async () => {
    const res = await get('/electronics?sort=desc');
    const prices = Array.isArray(res.body) ? res.body.map((i) => i.price) : [];
    const ok = prices.length === 10 && prices.every((p, i) => i === 0 || p <= prices[i - 1]);
    expect(
      ok,
      `Expected: electronics ordered from most expensive to cheapest\n  Got back prices: ${preview(prices)}`
    ).toBe(true);
  });

  it('shows an error message when maxPrice is not a number', async () => {
    const res = await get('/electronics?maxPrice=abc');
    expect(
      hasErrorMessage(res.body),
      `Expected: some error message (maxPrice "abc" is not valid)\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });

  it('shows an error message when sort is not asc or desc', async () => {
    const res = await get('/electronics?sort=cheapest');
    expect(
      hasErrorMessage(res.body),
      `Expected: some error message (sort must be asc or desc)\n  Got back: ${preview(res.body)}`
    ).toBe(true);
  });
});
