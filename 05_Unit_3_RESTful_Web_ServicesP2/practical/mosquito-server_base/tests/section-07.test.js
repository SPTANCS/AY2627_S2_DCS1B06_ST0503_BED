import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { findById, getNextId } from '../src/utils/collectionUtils.js';
import { getRiskLevel, withRiskLevel } from '../src/utils/riskUtils.js';
import { makeApp } from './helpers/makeApp.js';

describe('Section 7: collectionUtils', () => {
  const sample = [{ id: 1 }, { id: 2 }, { id: 5 }];

  it('findById coerces a string id and returns the match', () => {
    expect(findById(sample, '2')).toEqual({ id: 2 });
    expect(findById(sample, 2)).toEqual({ id: 2 });
  });

  it('findById returns undefined when nothing matches', () => {
    expect(findById(sample, 99)).toBeUndefined();
  });

  it('getNextId returns highestId + 1, not length + 1', () => {
    expect(getNextId(sample)).toBe(6);
    expect(getNextId([])).toBe(1);
  });
});

describe('Section 7: riskUtils', () => {
  it('getRiskLevel maps counts to bands', () => {
    expect(getRiskLevel(12)).toBe('high');
    expect(getRiskLevel(10)).toBe('high');
    expect(getRiskLevel(6)).toBe('medium');
    expect(getRiskLevel(5)).toBe('medium');
    expect(getRiskLevel(3)).toBe('low');
    expect(getRiskLevel(0)).toBe('low');
  });

  it('withRiskLevel adds the field without mutating the original', () => {
    const original = { id: 1, larvaeCount: 12 };
    const decorated = withRiskLevel(original);
    expect(decorated).toEqual({ id: 1, larvaeCount: 12, riskLevel: 'high' });
    expect(original).not.toHaveProperty('riskLevel');
  });
});

describe('Section 7: reports now carry riskLevel end-to-end', () => {
  let app;
  beforeEach(async () => {
    app = await makeApp({ reports: true });
  });

  it('GET /api/reports/1 reports high risk (12 larvae)', async () => {
    const res = await request(app).get('/api/reports/1');
    // riskLevel is the learning objective here, so pin it; the rest just needs
    // to carry through unchanged.
    expect(res.body).toEqual(
      expect.objectContaining({ id: 1, larvaeCount: 12, riskLevel: 'high' })
    );
  });

  it('GET /api/reports/2 reports low risk (3 larvae)', async () => {
    const res = await request(app).get('/api/reports/2');
    expect(res.body.riskLevel).toBe('low');
  });

  it('POST with 6 larvae reports medium risk', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({ blockId: 2, larvaeCount: 6 });
    expect(res.status).toBe(201);
    expect(res.body.riskLevel).toBe('medium');
  });

  it('GET /api/reports returns every report decorated with riskLevel', async () => {
    const res = await request(app).get('/api/reports');
    for (const report of res.body) {
      expect(report).toHaveProperty('riskLevel');
    }
  });
});
