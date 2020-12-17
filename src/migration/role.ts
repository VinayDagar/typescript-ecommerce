const globalAny: any = global;

async function up() {
    console.log(globalAny)
    await globalAny.MongooseConnect.models.Role.create([
        {
            name: 'Super Admin',
            value: 'superAdmin'
        },
        {
            name: 'Admin',
            value: 'admin'
        },
        {
            name: 'Customer',
            value: 'customer'
        },
        {
            name: 'Shop',
            value: 'shop'
        },
    ])
}


export default up;
