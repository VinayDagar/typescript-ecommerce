import fields from "./fields";
import beforeSave from "./hooks/before-save";
import afterSave from "./hooks/after-save";

const globalAny: any = global

const UserModel = new globalAny.MongooseSchema(fields, {
    timestamp: true
})

UserModel.pre("save", beforeSave);
UserModel.post("save", afterSave);

// Defining class methods for user model.
Object.assign(UserModel.methods, globalAny.configHolder.requireDirectory(module, "class-methods"))

export default globalAny.MongooseConnect.model("User", UserModel);
