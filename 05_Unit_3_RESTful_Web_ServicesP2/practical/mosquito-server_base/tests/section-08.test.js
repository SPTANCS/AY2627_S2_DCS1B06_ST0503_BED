import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import request from 'supertest';
import { makeApp } from './helpers/makeApp.js';

describe('Section 8: validateReport guards POST /api/reports', () => {
  let app;
  beforeEach(async () => {
    app = await makeApp({ reports: true });
  });

  it('400 when blockId or larvaeCount is missing', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({ larvaeCount: 4 });
    expect(res.status).toBe(400);
    // The rejection (400) is what matters; the wording is the student's choice.
    expect(typeof res.body.message).toBe('string');
  });

  it('400 when larvaeCount is not a number', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({ blockId: 1, larvaeCount: 'lots' });
    expect(res.status).toBe(400);
    expect(typeof res.body.message).toBe('string');
  });

  it('400 when larvaeCount is negative', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({ blockId: 1, larvaeCount: -3 });
    expect(res.status).toBe(400);
  });

  it('404 when the referenced block does not exist', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({ blockId: 99, larvaeCount: 4 });
    // A valid body but an unknown block is a 404, not a 400 — that distinction
    // is the point, so pin the status but not the message text.
    expect(res.status).toBe(404);
    expect(typeof res.body.message).toBe('string');
  });

  it('201 when the body is valid', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({ blockId: 1, larvaeCount: 4 });
    expect(res.status).toBe(201);
  });
});

describe('Section 8: requestLogger runs on every request', () => {
  let app;
  let logSpy;
  beforeEach(async () => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    app = await makeApp({ logger: true, reports: true });
  });
  afterEach(() => {
    logSpy.mockRestore();
  });

  it('logs exactly one line per request that references the url', async () => {
    await request(app).get('/api/reports');
    expect(logSpy).toHaveBeenCalledTimes(1);
    // Don't pin the exact format; just confirm the request's path shows up.
    expect(String(logSpy.mock.calls[0][0])).toContain('/api/reports');
  });
});
