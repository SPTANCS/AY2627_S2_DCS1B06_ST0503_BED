import { foods } from "../data/foods.js";

export function getAllFoods(req, res) {
  try {
    res.status(200).json(foods);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export function getFoodById(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Id must be a number" });
    }

    const food = foods.find((f) => f.id === id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(food);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export function createFood(req, res) {
  try {
    const { name, price, stall } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "name and price are required" });
    }

    const newFood = { id: foods.length + 1, name, price, stall };
    foods.push(newFood);
    res.status(201).json(newFood);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}
