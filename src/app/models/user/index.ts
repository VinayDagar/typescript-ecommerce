import fields from "./fields";
const globalAny: any = global

const UserModel = new globalAny.MongooseSchema(fields, {
    timestamp: true
})

export default globalAny.MongooseConnect.model("User", UserModel);
