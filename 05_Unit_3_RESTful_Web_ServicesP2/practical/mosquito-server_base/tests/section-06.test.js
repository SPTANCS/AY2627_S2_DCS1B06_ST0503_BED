import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from './helpers/makeApp.js';

let app;
beforeEach(async () => {
  app = await makeApp({ blocks: true });
});

describe('Section 6: block endpoints are mounted at /api/blocks', () => {
  it('GET /api/blocks returns all blocks with 200', async () => {
    const res = await request(app).get('/api/blocks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('GET /api/blocks/:id returns the matching block with 200', async () => {
    const res = await request(app).get('/api/blocks/1');
    expect(res.status).toBe(200);
    // The id must match the requested resource; other fields just need to exist.
    expect(res.body).toEqual(expect.objectContaining({ id: 1 }));
    expect(res.body).toHaveProperty('blockNumber');
    expect(res.body).toHaveProperty('town');
    expect(res.body).toHaveProperty('postalCode');
  });

  it('blocks carry no riskLevel field (risk applies to reports only)', async () => {
    const res = await request(app).get('/api/blocks/1');
    expect(res.body).not.toHaveProperty('riskLevel');
  });

  it('GET /api/blocks/99 returns 404 for an unknown id', async () => {
    const res = await request(app).get('/api/blocks/99');
    expect(res.status).toBe(404);
    expect(typeof res.body.message).toBe('string');
  });
});
