import express from "express";
import { createOrder, updateOrder } from "../../app/controllers/order";

const router = express.Router();
const globalAny: any = global;

router
    .post("/create-order",
        globalAny.middleware.authentication,
        globalAny.middleware.access.canAccess(["customer"]),
        createOrder
    )
    .put("/update-order/:orderId",
        globalAny.middleware.authentication,
        globalAny.middleware.access.canAccess(["customer"]),
        updateOrder
    )


export default router