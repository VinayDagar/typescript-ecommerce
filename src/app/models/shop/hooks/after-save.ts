const globalAny: any = global;

export default async function (this: any, next: any) {
    try {

        await globalAny.domain.Shop.findOneAndUpdate({
            _id: this.user
        }, {
            shop: this
        });

        return Promise.resolve(this);
    } catch (err: any) {
        return next(err)
    }
}