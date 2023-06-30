import mongoose from "mongoose";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./requireAuth";

export async function requireValidId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) return next();
    res.status(400).json({ error: 'Invalid id' });
}
