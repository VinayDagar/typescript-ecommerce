import crypto from "crypto";
import cryptoJS from "crypto-js";

export default (function () {
    const createHash = (value: string, salt: string) => {
        if (!value) throw new Error('Value must be provided in order to create the hash!')
        if (!salt) throw new Error('Salt must be provided in order to create the hash!')

        return crypto.createHmac('sha1', salt).update(value).digest('hex');

    }

    return {
        createHash,
    }
}())

