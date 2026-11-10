import { blocks } from "../data/store.js";

// TODO: Question 3
// Move the GET /api/blocks handler from index.js to here,
// and name it getAllBlocks.
const getAllBlocks = (req, res) => {
  res.status(200).json(blocks);
};

// TODO: Question 4
// Move the GET /api/blocks/:id handler from index.js to here,
// and name it getBlockById.
const getBlockById = (req, res) => {
  const block = blocks.find((b) => b.id === Number(req.params.id));
  if (!block) {
    return res.status(404).json({ message: "Block not found" });
  }
  res.status(200).json(block);
};

// TODO: Question 5
// Export both functions from the bottom of the file, the same way
// reportController.js does.
export { getAllBlocks, getBlockById };