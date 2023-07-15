import express from "express";

import { requireAuth } from "../middleware/requireAuth";
import { requireValidId } from "../middleware/requireValidId";
const { goalController } = require("../controllers/goalController");

const router = express.Router();

router.use(requireAuth);
router.param("id", requireValidId);

router.get("/", goalController.getGoals);

router.get("/all/:id", goalController.getGoalsWithTasks);

router.get("/:id", goalController.getGoal);

router.post("/", goalController.createGoal);

router.delete("/:id", goalController.deleteGoal);

router.patch("/:id", goalController.updateGoal);

export default router;
