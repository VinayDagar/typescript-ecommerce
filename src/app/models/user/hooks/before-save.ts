import { v1 } from "uuid";

const globalAny: any = global;

export default function (this: any, next: any) {
    try {
        this.salt = v1();
        this.password = globalAny.configHolder.encryptUtility.createHash(this.password, this.salt)

        return Promise.resolve(this);
    } catch (err: any) {
        return next(err)
    }
}