import express from "express";
import { requireValidId } from "../middleware/requireValidId";
import { requireAuth } from "../middleware/requireAuth";

const { sotdController } = require("../controllers/sotdController");

const router = express.Router();

router.use(requireAuth);
router.param("id", requireValidId);

router.get("/", sotdController.getSong);

router.post("/", sotdController.createSong);

router.delete("/:id", sotdController.deleteSong);

router.patch("/:id", sotdController.updateSong);

export default router;
