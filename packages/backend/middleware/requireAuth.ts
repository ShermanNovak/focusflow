import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const User = require("../models/User");

const SECRET = process.env.SECRET as string;
if (!SECRET) {
  throw new Error("SECRET is not defined in the environment variables.");
}

export interface AuthenticatedRequest extends Request {
  user_id?: string;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers as { authorization: string };

  if (!authorization) {
    return res.status(401).json({
      error: "authorization token required",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, SECRET) as { _id: string };
    const user = await User.findOne({ _id }).select("_id");
    req.user_id = user._id;
    console.log(`authorised with user_id: ${req.user_id}`);
    next();
  } catch (error: any) {
    res.status(401).json({ error: "Request is not authorised" });
  }
}
