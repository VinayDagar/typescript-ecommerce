import express from "express";
import { signupController, loginController } from "../../app/controllers/authentication"
import validationSchema from "../../validation";
import { validate } from "express-validation";

const router = express.Router();
const globalAny: any = global;


router.post("/signup/:role", validate(validationSchema.signupValidation, {}, {}), globalAny.middleware.access.canAccess(["anonymous"]), signupController)
router.post("/login", validate(validationSchema.loginValidation, {}, {}), globalAny.middleware.access.canAccess(["anonymous"]), loginController)


export default router