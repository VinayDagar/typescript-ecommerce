import fields from "./fields";
// import afterSave from "./hooks/after-save";

const globalAny: any = global;

const CartProductModal = new globalAny.MongooseSchema(fields, {
    timestamps: true
});

/**
 * @todo add after-update hook for sending notification for adding product
 */
export default globalAny.MongooseConnect.model("CartProduct", CartProductModal);
