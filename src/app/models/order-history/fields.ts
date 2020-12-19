const globalAny: any = global;

export default {
    order: {
        type: globalAny.ObjectId,
        ref: "Order"
    },
    status: {
        type: String,
        enum: ["placed", "packed", "shipped", "dispatch", "arrived_nearest", "out_for_delivery", "delivered", "cancelled", "return"],
        default: "placed"
    }
}