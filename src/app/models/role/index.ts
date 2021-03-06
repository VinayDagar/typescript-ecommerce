import fields from './fields';

const globalAny: any = global;

const RoleModel = new globalAny.MongooseSchema(fields, {
    timestamps: true
});

export default globalAny.MongooseConnect.model("Role", RoleModel);
