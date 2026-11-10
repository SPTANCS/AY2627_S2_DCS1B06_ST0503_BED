import { Router } from 'express';

import {
  getAllReports,
  getReportById,
  createReport,
  updateReport
} from '../controllers/reportController.js';

import { validateReport } from '../middleware/validateReport.js';

const router = Router();

// Paths here are RELATIVE to wherever this router is mounted
router.get('/', getAllReports);
router.get('/:id', getReportById);

// ROUTE level: validateReport runs first, createReport only if next() was called
router.post('/', validateReport, createReport);

router.put('/:id', validateReport, updateReport);


export default router;