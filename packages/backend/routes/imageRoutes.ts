import express from "express";

import { requireAuth } from "../middleware/requireAuth";
const { imageController } = require("../controllers/imageController");

const router = express.Router();

router.use(requireAuth);

router.get("/", imageController.getImageFiles);

router.post("/uploadfile", imageController.uploadImageFile);

export default router;
