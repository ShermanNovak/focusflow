import express from "express";
import { requireAuth } from '../middleware/requireAuth'

const { highlightController } = require("../controllers/highlightController");

const router = express.Router();

router.use(requireAuth); // requires user to sign in

router.post("/", highlightController.createHighlight);
router.get("/", highlightController.getHighlight); //-> filtered by that particular date to display the highlight
router.patch('/', highlightController.updateHighlight); //-> filtered by date

export default router;