import express from "express";
const { userController } = require("../controllers/userController");
import { requireAuth } from '../middleware/requireAuth'

const router = express.Router();

router.post("/signup", userController.signUpUser);

router.post("/login", userController.loginUser);

router.get("/theme", requireAuth, userController.getThemeColour);

router.patch("/theme", requireAuth, userController.updateThemeColour);

export default router;
