const globalAny:any = global;

export default {
    name: {
        type: String,
        required: [true, "Name is requird!"],
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        min: [10, "Number must be 10 digit"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        min: [6, "Password must be atleast 6 character long!"]
    },
    salt: {
        type: String,
        default: ''
    },
    role: {
        type: globalAny.ObjectId,
        ref: "Role",
        requried: true,
    },
    customer: {
        type: globalAny.ObjectId,
        ref: "Customer"
    },
    shop: {
        type: globalAny.ObjectId,
        ref: "Shop"
    },
    
}