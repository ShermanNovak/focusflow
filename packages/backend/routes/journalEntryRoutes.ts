import express from "express";
import { requireValidId } from "../middleware/requireValidId";
import { requireAuth } from "../middleware/requireAuth";

const { journalEntryController } = require("../controllers/journalEntryController");

const router = express.Router();

router.use(requireAuth);
router.param("id", requireValidId);

router.get("/all/:id", journalEntryController.getJournalEntries); // user_id

router.get("/:id", journalEntryController.getJournalEntry);

router.post("/:id", journalEntryController.createJournalEntry); // user_id

router.delete("/:id", journalEntryController.deleteJournalEntry);

router.put("/:id", journalEntryController.updateJournalEntry);

export default router;
