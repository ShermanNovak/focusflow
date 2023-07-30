
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";
import { Storage } from "@google-cloud/storage";

class ImageController {
  public async uploadImage(req: AuthenticatedRequest, res: Response) {
    const storage = new Storage();

    try {
      const options = {
        destination: `${req.user_id}/${req.body.fileName}`,
        // Optional:
        // Set a generation-match precondition to avoid potential race conditions
        // and data corruptions. The request to upload is aborted if the object's
        // generation number does not match your precondition. For a destination
        // object that does not yet exist, set the ifGenerationMatch precondition to 0
        // If the destination object already exists in your bucket, set instead a
        // generation-match precondition using its generation number.
        preconditionOpts: { ifGenerationMatch: 0 },
      };

      await storage
        .bucket(process.env.BUCKETNAME || "")
        .upload(req.body.filePath as string, options);
      res.json({
        message: `${req.body.filePath} uploaded to ${process.env.BUCKETNAME}`,
      });
    } catch (e: any) {
      res.json(e.message);
    }
  }

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

      res.json({
        message: `${req.user_id}/${uploadedFile.name} with contents ${
          uploadedFile.data
        } uploaded to ${process.env.BUCKETNAME || ""}`,
      });
    } catch (e: any) {
      res.json(e.message);
    }
  }
}

export const imageController = new ImageController();
