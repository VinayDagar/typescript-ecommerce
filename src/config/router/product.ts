import express from "express";
import { createProduct, updateProduct, deleteProduct, getProductDetails } from "../../app/controllers/product";
import validationSchema from "../../validation";
import { validate } from "express-validation";

const router = express.Router();
const globalAny: any = global;


router.post("/create-product",
    validate(validationSchema.createProductValidation, {}, {}),
    globalAny.middleware.authentication,
    globalAny.middleware.access.canAccess(["shopAdmin", "admin"]),
    createProduct
)
    .put("/edit-product/:productId",
        validate(validationSchema.createProductValidation, {}, {}),
        globalAny.middleware.authentication,
        globalAny.middleware.access.canAccess(["shopAdmin", "admin"]),
        updateProduct
    )
    .delete("/delete/:productId",
        globalAny.middleware.authentication,
        globalAny.middleware.access.canAccess(["shopAdmin", "admin"]),
        deleteProduct
    )
    .get("/detail-product/:productId",
        globalAny.middleware.access.canAccess(["anonymous"]),
        getProductDetails
    )


export default router