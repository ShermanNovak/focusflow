import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";

const SongOfTheDay = require("../models/SongOfTheDay");

class SOTDController {
  public async getSongs(req: AuthenticatedRequest, res: Response) {
    const songs = await SongOfTheDay.find({ user: req.user_id }).sort({
      createdAt: -1,
    });
    res.json(songs);
  }

  public async getSong(req: AuthenticatedRequest, res: Response) {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "date required in body" });

    const start = new Date(date.toString());
    start.setHours(0, 0, 0, 0);
    const end = new Date(date.toString());
    end.setHours(23, 59, 59, 999);

    const song = await SongOfTheDay.findOne(
      { createdAt: { $gte: start, $lte: end } },
      null,
      { sort: { createdAt: -1 } }
    );
    if (!song) return res.status(404).json({ error: "No such song" });

    res.json(song);
  }

  public async createSong(req: AuthenticatedRequest, res: Response) {
    try {
      const song = await SongOfTheDay.create({
        ...req.body,
        user: req.user_id,
      });
      res.json(song);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteSong(req: AuthenticatedRequest, res: Response) {
    const song = await SongOfTheDay.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ error: "No such song" });

    res.json(song);
  }

  public async updateSong(req: AuthenticatedRequest, res: Response) {
    const song = await SongOfTheDay.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!song) return res.status(404).json({ error: "No such song" });

    res.json(song);
  }
}

export const sotdController = new SOTDController();
