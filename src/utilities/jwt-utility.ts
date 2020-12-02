/**
 * @method createToken      creates the jw token out of the payload that we pass.
 * @method verifyToken      verifies the jw token, checks if the token still valid or not.
 *  
 */

const jwt = require("jsonwebtoken")

export default (function () {
    const createToken = (payload: any) => {
        if (!payload) throw new Error('Payload must be provided!')

        return jwt.sign(payload, process.env.APP_SECRET, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRE_TIME,
        })
    }

    const verifyToken = (token: string) => {
        if (!token) throw new Error('Token must be provided!')

        return jwt.verify(token, process.env.APP_SECRET)
    }

    return {
        createToken,
        verifyToken
    }
}())