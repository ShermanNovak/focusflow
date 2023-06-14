import mongoose from "mongoose";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";

const Event = require("../models/Event");

class EventController {
  public async getEvents(req: AuthenticatedRequest, res: Response) {
    const events = await Event.find({ user: req.user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(events);
  }

  public async getEvent(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such event" });
    }

    const event = await Event.find({ _id: id, user: req.user_id });
    if (!event) {
      return res.status(404).json({ error: "No such event" });
    }

    res.status(200).json(event);
  }

  public async createEvent(req: AuthenticatedRequest, res: Response) {
    try { 
        const event = await Event.create({...req.body, user: req.user_id})
        res.status(200).json(event);
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

  public async deleteEvent(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such event" });
    }

    const event = await Event.findOneAndDelete({ _id: id, user: req.user_id });
    if (!event) {
      return res.status(404).json({ error: "No such event" });
    }

    res.status(200).json(event);
  }

  public async updateEvent(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such event" });
    }

    const event = await Event.findOneAndUpdate(
      { _id: id, user: req.user_id },
      {
        ...req.body,
      }
    );

    if (!event) {
      return res.status(404).json({ error: "No such event" });
    }

    res.status(200).json(event);
  }
}

export const eventController = new EventController();
