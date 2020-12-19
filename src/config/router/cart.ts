import express from "express";
import { addToCart, removeItemFromCart, clearCart } from "../../app/controllers/cart"

const router = express.Router();
const globalAny: any = global;

router
    .post("/add-to-cart/:productId",
        globalAny.middleware.authentication,
        globalAny.middleware.access.canAccess(["customer"]),
        addToCart
    )
    .put("/remove-item/:productId",
        globalAny.middleware.authentication,
        globalAny.middleware.access.canAccess(["customer"]),
        removeItemFromCart
    )
    .put("/clear-cart",
        globalAny.middleware.authentication,
        globalAny.middleware.access.canAccess(["customer"]),
        clearCart
    )


export default router