import { blocks } from '../data/store.js';
import { findById } from '../utils/collectionUtils.js';

const validateReport = (req, res, next) => {
  const { blockId, larvaeCount } = req.body;

  if (blockId === undefined || larvaeCount === undefined) {
    return res.status(400).json({
      message: 'blockId and larvaeCount are required'
    });
  }

  if (typeof larvaeCount !== 'number' || larvaeCount < 0) {
    return res.status(400).json({
      message: 'larvaeCount must be a number that is 0 or greater'
    });
  }

  if (!findById(blocks, blockId)) {
    return res.status(404).json({
      message: `No HDB block found with id ${blockId}`
    });
  }

  next(); // all checks passed, hand over to the controller
};

export { validateReport };