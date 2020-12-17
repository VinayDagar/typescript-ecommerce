const globalAny: any = global;

export default async function (this: any, next: any) {
    try {

        await globalAny.domain.Customer.findOneAndUpdate({
            _id: this.customer
        }, {
            cart: this
        });

        return Promise.resolve(this);
    } catch (err: any) {
        return next(err)
    }
}