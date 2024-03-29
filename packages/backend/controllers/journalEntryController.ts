import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";

const JournalEntry = require("../models/JournalEntry");

class JournalEntryController {
  public async getJournalEntries(req: AuthenticatedRequest, res: Response) {
    try {
      const { date, limit } = req.query;
      const filter: {
        user?: string;
        createdAt?: {
          $gte: Date;
          $lte: Date;
        };
      } = { user: req.user_id };

      if (date) {
        const start = new Date(date.toString());
        start.setHours(0, 0, 0, 0);
        const end = new Date(date.toString());
        end.setHours(23, 59, 59, 999);

        filter.createdAt = { $gte: start, $lte: end };
      }

      let query = JournalEntry.find(filter).sort({ createdAt: -1 });
      if (limit) query = query.limit(limit);
      const journalEntries = await query;

      res.json(journalEntries);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async getJournalEntry(req: AuthenticatedRequest, res: Response) {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "date required as param" });

    const start = new Date(date.toString());
    start.setHours(0, 0, 0, 0);
    const end = new Date(date.toString());
    end.setHours(23, 59, 59, 999);

    const entry = await JournalEntry.findOne(
      { createdAt: { $gte: start, $lte: end } },
      null,
      { sort: { createdAt: -1 } }
    );
    if (!entry) return res.status(404).json({ error: "No such journal entry" });

    res.json(entry);
  }

  public async createJournalEntry(req: AuthenticatedRequest, res: Response) {
    try {
      const entry = await JournalEntry.create({
        ...req.body,
        user: req.user_id,
      });
      res.json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteJournalEntry(req: AuthenticatedRequest, res: Response) {
    const entry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: "No such journal entry" });

    res.json(entry);
  }

  public async updateJournalEntry(req: AuthenticatedRequest, res: Response) {
    const entry = await JournalEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    if (!entry) return res.status(404).json({ error: "No such journal entry" });

    res.json(entry);
  }
}

export const journalEntryController = new JournalEntryController();
