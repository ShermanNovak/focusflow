
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";
import { Storage } from "@google-cloud/storage";

const Image = require("../models/Image");

class ImageController {
  public storage;

  constructor() {
    this.storage = new Storage();
  }

  public async uploadPhotoOfTheDay(req: AuthenticatedRequest, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = Array.isArray(req.files.actualFile)
    ? req.files.actualFile[0] // If multiple files are uploaded, use the first one
    : req.files.actualFile;

    try {
      await this.storage
        .bucket(process.env.BUCKETNAME1 || "")
        .file(`${req.user_id}/${uploadedFile.name}`)
        .save(uploadedFile.data);

      const entry = await Image.create({
        url: `https://storage.cloud.google.com/${process.env.BUCKETNAME1}/${req.user_id}/${uploadedFile.name}`,
        user: req.user_id,
      });
      res.json(entry);
    } catch (e: any) {
      res.json(e.message);
    }
  }

  public async uploadJournalPhoto(req: AuthenticatedRequest, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = Array.isArray(req.files.actualFile)
    ? req.files.actualFile[0] // If multiple files are uploaded, use the first one
    : req.files.actualFile;

    try {
      await this.storage
        .bucket(process.env.BUCKETNAME2 || "")
        .file(`${req.user_id}/${uploadedFile.name}`)
        .save(uploadedFile.data);
    } catch (e: any) {
      res.json(e.message);
    }
  }

  public async uploadTaskPhoto(req: AuthenticatedRequest, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = Array.isArray(req.files.actualFile)
    ? req.files.actualFile[0] // If multiple files are uploaded, use the first one
    : req.files.actualFile;

    try {
      await this.storage
        .bucket(process.env.BUCKETNAME3 || "")
        .file(`${req.user_id}/${uploadedFile.name}`)
        .save(uploadedFile.data);
    } catch (e: any) {
      res.json(e.message);
    }
  }

  public async getImageFile(req: AuthenticatedRequest, res: Response) {
    const startDate = new Date().setHours(0, 0, 0, 0);
    const endDate = new Date().setHours(23, 59, 59, 999);
    const images = await Image.findOne({
      createdAt: { $gte: startDate, $lt: endDate },
      user: req.user_id,
    }).sort({ createdAt: -1 });
    if (!images) return res.json({});

    res.json(images);
  }

  public async getImageFiles(req: AuthenticatedRequest, res: Response) {
    const images = await Image.find({
      user: req.user_id,
    }).sort({ createdAt: -1 });
    if (!images) return res.json({});

    res.json(images);
  }
}

export const imageController = new ImageController();
