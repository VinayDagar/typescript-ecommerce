import express from "express";
import { addToCart } from "../../app/controllers/cart"
// import validationSchema from "../../validation";
// import { validate } from "express-validation";

const router = express.Router();
const globalAny: any = global;


router
    .post("/add-to-cart/:productId",
        globalAny.middleware.authentication,
        globalAny.middleware.access.canAccess(["customer"]),
        addToCart
    )
// router.post("/login", globalAny.middleware.authenticated, globalAny.middleware.access.canAccess(["customer"]), addToCart)


export default router