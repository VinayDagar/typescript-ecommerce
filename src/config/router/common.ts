import express from "express";
import { signupController } from "../../app/controllers/authentication"
const router = express.Router();

router.post("/signup", signupController)

export default router