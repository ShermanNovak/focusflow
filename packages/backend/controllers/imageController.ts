
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";
import { Storage } from "@google-cloud/storage";

const Image = require("../models/Image");

class ImageController {
  public async uploadImageFile(req: AuthenticatedRequest, res: Response) {
    const storage = new Storage();

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = Array.isArray(req.files.actualFile)
    ? req.files.actualFile[0] // If multiple files are uploaded, use the first one
    : req.files.actualFile;

    try {
      await storage
        .bucket(process.env.BUCKETNAME || "")
        .file(`${req.user_id}/${uploadedFile.name}`)
        .save(uploadedFile.data);

      const entry = await Image.create({
        url: `https://storage.cloud.google.com/photo_of_the_day/${req.user_id}/${uploadedFile.name}`,
        user: req.user_id,
      });
      res.json(entry);
    } catch (e: any) {
      res.json(e.message);
    }
  }

  public async getImageFiles(req: AuthenticatedRequest, res: Response) {
    const startDate = new Date().setHours(0, 0, 0, 0);
    const endDate = new Date().setHours(23, 59, 59, 999);
    const images = await Image.findOne({
      createdAt: { $gte: startDate, $lt: endDate },
      user: req.user_id,
    }).sort({ createdAt: -1 });
    if (!images) return res.json({});

    res.json(images);
  }
}

export const imageController = new ImageController();
