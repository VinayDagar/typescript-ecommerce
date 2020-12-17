import fields from "./fields";
import afterSave from "./hooks/after-save";

const globalAny: any = global;

const WishlistModal = new globalAny.MongooseSchema(fields, {
    timestamp: true
});

WishlistModal.post("save", afterSave);

export default globalAny.MongooseConnect.model("Wishlist", WishlistModal);
