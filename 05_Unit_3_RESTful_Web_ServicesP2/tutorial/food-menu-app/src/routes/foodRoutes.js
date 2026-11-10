import express from "express";
import {
  getAllFoods,
  getFoodById,
  createFood
} from "../controllers/foodController.js";

const router = express.Router();

router.get("/", getAllFoods);
router.get("/:id", getFoodById);
router.post("/", createFood);

export default router;
