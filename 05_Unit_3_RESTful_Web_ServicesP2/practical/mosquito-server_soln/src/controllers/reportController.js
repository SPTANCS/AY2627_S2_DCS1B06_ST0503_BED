import { reports } from '../data/store.js';

import { findById, getNextId } from '../utils/collectionUtils.js';
import { withRiskLevel } from '../utils/riskUtils.js';

// GET /api/reports
const getAllReports = (req, res) => {
  res.status(200).json(reports);
};

// TODO: Question 1
// Move the GET /api/reports/:id handler from index.js to here,
// and name it getReportById.
const getReportById = (req, res) => {

  // ***** ABSTRACTED OUT *****
  // was: reports.find((r) => r.id === Number(req.params.id))
  const report = findById(reports, req.params.id);
  // **************************

  if (!report) {
    return res.status(404).json({ message: 'Report not found' });
  }
  res.status(200).json(report);
};

// TODO: Question 2
// Move the POST /api/reports handler from index.js to here,
// and name it createReport.
const createReport = (req, res) => {
  const { blockId, larvaeCount } = req.body;
  if (!blockId || larvaeCount === undefined) {
    return res.status(400).json({ message: 'blockId and larvaeCount are required' });
  }
  const newReport = {
    // ***** ABSTRACTED OUT: was reports.length + 1 *****
    id: getNextId(reports),
    blockId,
    larvaeCount,
    reportedAt: new Date().toISOString().slice(0, 10),
    status: 'open'
  };
  reports.push(newReport);
  res.status(201).json(newReport);
};

// PUT /api/reports/:id
// Question 10: replace an existing report's editable fields, leaving
// reportedAt and status untouched. Body is already validated by middleware.
const updateReport = (req, res) => {
  const report = findById(reports, req.params.id);

  if (!report) {
    return res.status(404).json({ message: 'Report not found' });
  }

  const { blockId, larvaeCount } = req.body;
  report.blockId = blockId;
  report.larvaeCount = larvaeCount;

  res.status(200).json(withRiskLevel(report));
};


// Add each new handler's name to this list as you write it
export { getAllReports, getReportById, createReport, updateReport};