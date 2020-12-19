const globalAny: any = global;

export default {
    customer: {
        type: globalAny.ObjectId,
        ref: "Customer"
    },
    status: {
        type: String,
        enum: ["placed", "packed", "shipped", "dispatch", "out_for_delivery", "delivered", "cancelled", "return"],
        default: "placed"
    },
    expectedDeliveryTime: {
        type: Date,
    },
    deliveredOn: {
        type: Date
    },
    // orderId: {
    //     type: String,
    //     required: true
    // },
    paymentMode: {
        type: String,
        enum: ["cod", "net_banking", "upi", "debit_card", "credit_card"],
        required: true
    },
    address: {
        type: globalAny.ObjectId,
        ref: "Address"
    },
    total: {
        type: Number,
        default: 0
    },
    couponCode: {
        type: globalAny.ObjectId,
        ref: "Coupon"
    },
    totalPayable: {
        type: Number
    },
    product: {
        type: globalAny.ObjectId,
        ref: "Product"
    }
}