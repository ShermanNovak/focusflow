import express from "express";
import { requireAuth } from '../middleware/requireAuth'
const { eventController } = require("../controllers/eventController");

const router = express.Router();

router.use(requireAuth);

router.get("/", eventController.getEvents);

router.get("/:id", eventController.getEvent);

router.post("/", eventController.createEvent);

router.delete('/:id', eventController.deleteEvent)

router.patch('/:id', eventController.updateEvent)

export default router;
