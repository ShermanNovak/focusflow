import express from "express";

import { requireAuth } from "../middleware/requireAuth";
import { requireValidId } from "../middleware/requireValidId";
const { taskController } = require("../controllers/taskController");

const router = express.Router();

router.use(requireAuth);
router.param("id", requireValidId);

router.get("/", taskController.getTasksOnly);

router.get("/:id", taskController.getTask);

router.post("/", taskController.createTask);

router.delete("/:id", taskController.deleteTask);

router.patch("/:id", taskController.updateTask);

export default router;
