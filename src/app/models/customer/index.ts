import fields from "./fields";
const globalAny: any = global

const CustomerModel = new globalAny.MongooseSchema(fields, {
    timestamp: true
})

export default globalAny.MongooseConnect.model("Customer", CustomerModel);
