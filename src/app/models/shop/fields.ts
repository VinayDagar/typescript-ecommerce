const globalAny:any = global;

export default {
    name: {
        type: String,
        required: [true, "Name is requird!"],
        trim: true
    },
    address: {
        type: globalAny.ObjectId,
        ref: "Address"
    },
    products: [{
        type: globalAny.ObjectId,
        ref: "Product"
    }],
    user: {
        type: globalAny.ObjectId,
        ref: "User"    
    }
}