import express from "express";
import { requireAuth } from '../middleware/requireAuth'
const { goalController } = require("../controllers/goalController");

const router = express.Router();

router.use(requireAuth);

router.get("/", goalController.getGoals);

router.get("/all/:id", goalController.getGoalsWithTasks);

router.get("/:id", goalController.getGoal);

router.post("/", goalController.createGoal);

router.delete('/:id', goalController.deleteGoal)

router.patch('/:id', goalController.updateGoal)

export default router;
