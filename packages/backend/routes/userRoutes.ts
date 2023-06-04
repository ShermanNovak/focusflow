import express from "express";
const {
    signUpUser,
    loginUser
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUpUser);

router.post("/login", loginUser);

export default router;
