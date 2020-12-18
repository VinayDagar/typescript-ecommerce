const globalAny: any = global;

export default {
    cart: {
        type: globalAny.ObjectId,
        ref: "Cart"
    },
    product: {
        type: globalAny.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
}