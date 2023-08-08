import express from "express";

import { requireAuth } from "../middleware/requireAuth";
const { imageController } = require("../controllers/imageController");

const router = express.Router();

router.use(requireAuth);

router.get("/", imageController.getImageFile);

router.get("/all", imageController.getImageFiles);

router.post("/journal", imageController.uploadJournalPhoto);

router.post("/task", imageController.uploadTaskPhoto);

router.post("/photooftheday", imageController.uploadPhotoOfTheDay);

export default router;
