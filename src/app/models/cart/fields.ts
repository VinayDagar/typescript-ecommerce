const globalAny: any = global;

export default {
    isEmpty: {
        type: Boolean,
        default: true,
    },
    cartProducts: [{
        type: globalAny.ObjectId,
        ref: "CartProduct",
    }],
    isCartLocked: {
        type: Boolean,
        default: false,
    },
    customer: {
        type: globalAny.ObjectId,
        ref: "Customer",
    },
    totalPrice: {
        type: Number,
        default: 0
    }
}