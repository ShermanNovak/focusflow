import mongoose from "mongoose";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";

const JournalEntry = require('../models/JournalEntry');

class JournalEntryController {
    public async getJournalEntries (req: AuthenticatedRequest, res: Response) {
        const journalEntries = await JournalEntry.find({ user: req.params.id }).sort({ createdAt: -1 });
        res.json(journalEntries);
    }

    public async getJournalEntry (req: AuthenticatedRequest, res: Response) {
        const entry = await JournalEntry.findById(req.params.id);
        if (!entry) return res.status(404).json({ error: 'No such journal entry' });

        res.json(entry);
    }

    public async createJournalEntry (req: AuthenticatedRequest, res: Response) {
        try {
            const entry = await JournalEntry.create({...req.body, user: req.params.id})
            res.json(entry);
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    public async deleteJournalEntry (req: AuthenticatedRequest, res: Response) {
        const entry = await JournalEntry.findByIdAndDelete(req.params.id);
        if (!entry) return res.status(404).json({ error: 'No such journal entry' });

        res.json(entry);
    }

    public async updateJournalEntry (req: AuthenticatedRequest, res: Response) {
        const entry = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (!entry) return res.status(404).json({ error: 'No such journal entry' });

        res.json(entry);
    }
}

export const journalEntryController = new JournalEntryController();
