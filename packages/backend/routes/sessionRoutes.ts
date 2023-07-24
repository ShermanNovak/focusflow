import express from "express";

import { requireAuth } from "../middleware/requireAuth";
import { requireValidId } from "../middleware/requireValidId";
const { sessionController } = require("../controllers/sessionController");

const router = express.Router();

router.use(requireAuth);
router.param("id", requireValidId);

router.get("/", sessionController.getSessions);

router.get("/:id", sessionController.getSession);

router.post("/", sessionController.createSession);

router.delete("/:id", sessionController.deleteSession);

router.patch("/:id", sessionController.updateSession);

export default router;
