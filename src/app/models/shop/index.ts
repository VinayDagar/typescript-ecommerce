import fields from "./fields";
const globalAny: any = global;

const ShopModel = new globalAny.MongooseSchema(fields, {
    timestamp: true
})

export default globalAny.MongooseConnect.model("Shop", ShopModel);
