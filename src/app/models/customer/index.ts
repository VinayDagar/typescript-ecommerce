import fields from "./fields";
import afterSave from "./hooks/after-save";

const globalAny: any = global

const CustomerModel = new globalAny.MongooseSchema(fields, {
    timestamps: true
});

CustomerModel.post('save', afterSave);

export default globalAny.MongooseConnect.model("Customer", CustomerModel);
