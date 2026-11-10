import { Router } from 'express';
// TODO: Question 6
// Import getAllBlocks and getBlockById from the block controller.
// Remember the '../' step up out of src/routes, and the .js extension.
import { getAllBlocks, getBlockById } from '../controllers/blockController.js'

const router = Router();

// TODO: Question 7
// Register GET '/'    -> getAllBlocks
// Register GET '/:id' -> getBlockById
// Paths here are RELATIVE to wherever this router is mounted
router.get('/', getAllBlocks);
router.get('/:id', getBlockById);

export default router;