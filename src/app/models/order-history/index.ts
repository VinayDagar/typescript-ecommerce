import fields from "./fields";
// import afterSave from "./hooks/after-save";

const globalAny: any = global;

const OrderHistoryModal = new globalAny.MongooseSchema(fields, {
    timestamps: true
});

// OrderHistoryModal.post("save", afterSave);
export default globalAny.MongooseConnect.model("OrderHistory", OrderHistoryModal);
