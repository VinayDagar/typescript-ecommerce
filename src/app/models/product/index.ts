import fields from "./fields";

const globalAny: any = global

const ProductModal = new globalAny.MongooseSchema(fields, {
    timestamps: true
})

export default globalAny.MongooseConnect.model("Product", ProductModal);