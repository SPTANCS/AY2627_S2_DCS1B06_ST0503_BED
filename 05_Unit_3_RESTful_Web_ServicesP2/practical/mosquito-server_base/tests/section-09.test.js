import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from './helpers/makeApp.js';

let app;
beforeEach(async () => {
  app = await makeApp({ reports: true, notFound: true });
});

describe('Section 9: PUT /api/reports/:id', () => {
  it('200 updates larvaeCount while leaving reportedAt and status untouched', async () => {
    const res = await request(app)
      .put('/api/reports/1')
      .send({ blockId: 2, larvaeCount: 20 });

    expect(res.status).toBe(200);
    // These behaviours are the objective: the editable fields change, the
    // others are preserved, and riskLevel is recomputed from the new count.
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        blockId: 2,
        larvaeCount: 20,
        reportedAt: '2026-08-01', // untouched
        status: 'open', // untouched
        riskLevel: 'high' // recomputed: 20 >= 10
      })
    );
  });

  it('404 when the report id does not exist (body was valid)', async () => {
    const res = await request(app)
      .put('/api/reports/99')
      .send({ blockId: 2, larvaeCount: 20 });

    expect(res.status).toBe(404);
    expect(typeof res.body.message).toBe('string');
  });

  it('400 when the body is invalid, before updateReport runs', async () => {
    const res = await request(app)
      .put('/api/reports/1')
      .send({ larvaeCount: 20 });

    expect(res.status).toBe(400);
    expect(typeof res.body.message).toBe('string');
  });
});

describe('Section 9: notFound catch-all', () => {
  it('404 for an unknown path, echoing the path that was not found', async () => {
    const res = await request(app).get('/api/abcdefgxxxxxx');
    expect(res.status).toBe(404);
    // The teaching point is that the message is dynamic (it interpolates the
    // requested url), not the exact wording of the joke around it.
    expect(res.body.message).toContain('/api/abcdefgxxxxxx');
  });
});
