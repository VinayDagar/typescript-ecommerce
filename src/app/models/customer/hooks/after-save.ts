const globalAny: any = global;

export default async function (this: any, next: any) {
    try {

        await new globalAny.domain.Cart({
            customer: this
        }).save();

        await new globalAny.domain.Wishlist({
            customer: this
        }).save();

        await globalAny.domain.User.findOneAndUpdate({
            _id: this.user
        }, {
            customer: this
        });

        return Promise.resolve(this);
    } catch (err: any) {
        return next(err)
    }
}