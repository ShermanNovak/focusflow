import express from "express";
import { requireAuth } from "../middleware/requireAuth";

const { imageController } = require("../controllers/imageController");

const router = express.Router();

router.use(requireAuth);

router.post("/upload", imageController.uploadImage); 

export default router;