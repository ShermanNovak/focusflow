import mongoose from "mongoose";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";

const Highlight = require('../models/highlight');

class HighlightController {
    public async createHighlight (req: AuthenticatedRequest, res: Response) { // create request and response object
        try { // to create a new highlight of the day
            console.log('req:', req.body);
            console.log('userid:', req.user_id);
            const highlight = await Highlight.create({...req.body, user: req.user_id}) // waiting for highlight to be created before highlight is sent
            console.log('created highlight:', highlight);
            res.status(200).json(highlight);; // send response back to the client, with highlight as the data
        } catch (error: any) { // to catch errors
            res.status(400).json({ error: error.message })
        }
    }

    public async getHighlight (req: AuthenticatedRequest, res: Response) {
        try {
            // const { date } = req.params;

            const startDate = new Date(); // today's date
            startDate.setHours(0, 0, 0, 0); // set time to 00:00:00:000
            const endDate = new Date();
            endDate.setHours(23, 59, 59, 999); // set time to 23:59:59:999
        
            const highlights = await Highlight.find({
                createdAt: { $gte: startDate, $lt: endDate }// >= startdate and < enddate -> within the day
            });
        
            if (highlights.length === 0) {
                return res.status(404).json({ error: 'No highlights found for today' });
            }
        
            res.json(highlights);
          } catch (error: any) { // to catch errors
            res.status(400).json({ error: error.message })
        }
    }

    public async updateHighlight (req: AuthenticatedRequest, res: Response) {
        const startDate = new Date(); // today's date
            startDate.setHours(0, 0, 0, 0); // set time to 00:00:00:000
            const endDate = new Date();
            endDate.setHours(23, 59, 59, 999); // set time to 23:59:59:999
        
        const highlight = await Highlight.findOneAndUpdate(
            { createdAt: { $gte: startDate, $lt: endDate } }, // Filter by date range
            { $set: { content: req.body.content } }, // Replace "yourUpdateObject" with the fields you want to update
            { new: true }, // Options to return the updated document)
        )
        if (!highlight) return res.status(404).json({ error: 'No highlight for today' });

        res.json(highlight);
    }

}

export const highlightController = new HighlightController();
