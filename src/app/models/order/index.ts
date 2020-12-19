import fields from "./fields";
import afterSave from "./hooks/after-save";
import afterUpdate from "./hooks/after-update";

const globalAny: any = global;

const OrderModal = new globalAny.MongooseSchema(fields, {
    timestamps: true
});

OrderModal.post("save", afterSave);
OrderModal.post("update", afterUpdate)
export default globalAny.MongooseConnect.model("Order", OrderModal);
