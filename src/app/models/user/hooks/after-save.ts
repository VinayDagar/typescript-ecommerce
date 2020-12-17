const globalAny: any = global;

export default async function (this: any, next: any) {
    try {

        if (this.role === "customer") {
            await new globalAny.domain.Customer({
                name: this.name,
                user: this,

            }).save();
        } else if (this.role === "shopAdmin") {
            await new globalAny.domain.Shop({
                name: this.name,
                user: this,
            }).save();
        }

        return Promise.resolve(this);
    } catch (err: any) {
        return next(err)
    }
}