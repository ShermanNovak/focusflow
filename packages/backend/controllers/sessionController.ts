import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";

const Session = require("../models/Session");

class SessionController {
  public async getSessions(req: AuthenticatedRequest, res: Response) {
    const sessions = await Session.find({ user: req.user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(sessions);
  }

  public async getSession(req: AuthenticatedRequest, res: Response) {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "No such session" });
    }

    res.status(200).json(session);
  }

  public async createSession(req: AuthenticatedRequest, res: Response) {
    try {
      const session = await Session.create({ ...req.body, user: req.user_id });
      res.status(200).json(session);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteSession(req: AuthenticatedRequest, res: Response) {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "No such session" });
    }

    res.status(200).json(session);
  }

  public async updateSession(req: AuthenticatedRequest, res: Response) {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    if (!session) {
      return res.status(404).json({ error: "No such session" });
    }

    res.status(200).json(session);
  }
}

export const sessionController = new SessionController();
