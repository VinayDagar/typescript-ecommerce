const globalAny: any = global;

export default async function (this: any, next: any) {
    try {
        await new globalAny.domain.OrderHistory({
            order: this,
            status: this.status
        }).save();

        /**
         *  @TODO send notification to the customer 
         */

        return Promise.resolve(this);
    } catch (err: any) {
        return next(err)
    }
}