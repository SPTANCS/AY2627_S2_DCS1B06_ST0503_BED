import { describe, it, expect } from 'vitest';
import * as reportController from '../src/controllers/reportController.js';

describe('Section 4: reportController exposes the three handlers', () => {
  it.each(['getAllReports', 'getReportById', 'createReport'])(
    'exports %s as a function',
    (name) => {
      expect(typeof reportController[name]).toBe('function');
    }
  );

  it('handlers take the Express (req, res) signature', () => {
    // Express handlers are declared with two params.
    expect(reportController.getAllReports.length).toBe(2);
    expect(reportController.getReportById.length).toBe(2);
    expect(reportController.createReport.length).toBe(2);
  });
});
