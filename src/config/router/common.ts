import express from "express";
import { signupController, loginController } from "../../app/controllers/authentication"
const router = express.Router();
const globalAny: any = global;

router.post("/signup/:role", globalAny.middleware.access.canAccess(["anonymous"]), signupController)
router.post("/login", globalAny.middleware.access.canAccess(["anonymous"]), loginController)


export default router