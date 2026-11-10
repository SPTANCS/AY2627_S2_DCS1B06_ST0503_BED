import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from './helpers/makeApp.js';

let app;
beforeEach(async () => {
  app = await makeApp({ reports: true });
});

describe('Section 5: report endpoints are mounted at /api/reports', () => {
  it('GET /api/reports returns all reports with 200', async () => {
    const res = await request(app).get('/api/reports');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toEqual(expect.objectContaining({ id: 1, blockId: 1 }));
  });

  it('GET /api/reports/:id returns a single report with 200', async () => {
    const res = await request(app).get('/api/reports/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        blockId: 1,
        larvaeCount: 12,
        reportedAt: '2026-08-01',
        status: 'open'
      })
    );
  });

  it('GET /api/reports/:id returns 404 for an unknown id', async () => {
    const res = await request(app).get('/api/reports/99');
    expect(res.status).toBe(404);
    // The status code is what matters; the exact wording is up to the student.
    expect(typeof res.body.message).toBe('string');
  });

  it('POST /api/reports creates a report and returns 201', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({ blockId: 1, larvaeCount: 7 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 3,
        blockId: 1,
        larvaeCount: 7,
        status: 'open'
      })
    );
    // reportedAt is today's date in YYYY-MM-DD form
    expect(res.body.reportedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
