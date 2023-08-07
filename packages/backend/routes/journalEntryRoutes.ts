import express from "express";
import { requireValidId } from "../middleware/requireValidId";
import { requireAuth } from "../middleware/requireAuth";

const { journalEntryController } = require("../controllers/journalEntryController");

const router = express.Router();

router.use(requireAuth);
router.param("id", requireValidId);

router.get("/", journalEntryController.getJournalEntries);

router.get("/:id", journalEntryController.getJournalEntry);

router.post("/", journalEntryController.createJournalEntry);

router.delete("/:id", journalEntryController.deleteJournalEntry);

router.patch("/:id", journalEntryController.updateJournalEntry);

export default router;
