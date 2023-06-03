import express from "express";
const {
  getGoals,
  getGoal,
  createGoal,
  deleteGoal,
  updateGoal
} = require("../controllers/goalController");

const router = express.Router();

router.get("/", getGoals);

router.get("/:id", getGoal);

router.post("/", createGoal);

router.delete('/:id', deleteGoal)

router.patch('/:id', updateGoal)

export default router;
