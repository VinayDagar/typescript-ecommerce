import fields from "./fields";

const globalAny: any = global

const ProductModal = new globalAny.MongooseSchema(fields, {
    timestamp: true
})

export default globalAny.MongooseConnect.model("Product", ProductModal);