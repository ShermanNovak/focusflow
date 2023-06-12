import express from "express";
import { requireAuth } from '../middleware/requireAuth'
const { taskController } = require("../controllers/taskController");

const router = express.Router();

router.use(requireAuth);

router.get("/", taskController.getTasks);

router.get("/:id", taskController.getTask);

router.post("/", taskController.createTask);

router.delete('/:id', taskController.deleteTask)

router.patch('/:id', taskController.updateTask)

export default router;