const globalAny: any = global;

export default {
    customer: {
        type: globalAny.ObjectId,
        ref: "Customer"
    },
    wishlistProducts: [{
        type: globalAny.ObjectId,
        ref: "WishlistProduct"
    }]
}