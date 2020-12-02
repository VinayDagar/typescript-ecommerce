import fields from './fields';

const globalAny: any = global;

const RoleModel = new globalAny.MongooseSchema(fields, {
    timestamp: true
});

export default globalAny.MongooseConnect.model("Role", RoleModel);
