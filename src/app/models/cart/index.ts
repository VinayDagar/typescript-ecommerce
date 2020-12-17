import fields from "./fields";
import afterSave from "./hooks/after-save";

const globalAny: any = global;

const CartModal = new globalAny.MongooseSchema(fields, {
    timestamp: true
});

CartModal.post("save", afterSave);
export default globalAny.MongooseConnect.model("Cart", CartModal);
