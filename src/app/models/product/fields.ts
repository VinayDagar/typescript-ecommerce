const globalAny:any = global;

export default {
    title: {
        type: String,
        reqired: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    creator: {
        type: globalAny.ObjectId,
        ref: "Shop"
    },
    isInStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: true
    }
}