const globalAny:any = global;

export default {
    name: {
        type: String,
        required: [true, "Name is requird!"],
        trim: true
    },
    addresses: [{
        type: globalAny.ObjectId,
        ref: "Address"
    }], 
    user: {
        type: globalAny.ObjectId,
        ref: "User"
    },
    cart: {
        type: globalAny.ObjectId,
        ref: "Cart"
    },   
    wishlist: {
        type: globalAny.ObjectId,
        ref: "Wishlist"
    },
    paymentMethods: [{
        type: globalAny.ObjectId,
        ref: "PaymentMethod"
    }],
    orders: [{
        type: globalAny.ObjectId,
        ref: "Order"
    }],
    ratings: [{
        type: globalAny.ObjectId,
        ref: "Rating"
    }],
    reviews: [{
        type: globalAny.ObjectId,
        ref: "Review"
    }],
}