import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { blocks, reports } from '../src/data/store.js';

describe('Section 3: the data lives in src/data/store.js', () => {
  it('store.js exports a blocks array of the right shape', () => {
    expect(Array.isArray(blocks)).toBe(true);
    expect(blocks).toHaveLength(2);
    for (const block of blocks) {
      // Presence of the fields matters here, not their exact text — a student
      // typo in a town name should not fail the "did you move the data" check.
      expect(block).toHaveProperty('id');
      expect(block).toHaveProperty('blockNumber');
      expect(block).toHaveProperty('town');
      expect(block).toHaveProperty('postalCode');
    }
  });

  it('store.js exports a reports array of the right shape', () => {
    expect(Array.isArray(reports)).toBe(true);
    expect(reports).toHaveLength(2);
    for (const report of reports) {
      expect(report).toHaveProperty('id');
      expect(report).toHaveProperty('blockId');
      expect(report).toHaveProperty('larvaeCount');
      expect(report).toHaveProperty('reportedAt');
      expect(report).toHaveProperty('status');
    }
  });

  it('the arrays are gone from index.js', () => {
    const indexSrc = readFileSync(new URL('../index.js', import.meta.url), 'utf8');
    expect(indexSrc).not.toMatch(/const\s+blocks\s*=/);
    expect(indexSrc).not.toMatch(/const\s+reports\s*=/);
  });
});
