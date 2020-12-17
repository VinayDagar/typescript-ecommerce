import { NextFunction, Response } from "express";

export default (function () {
    const canAccess = (access = ['superAdmin']) => {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const isAnonymous = access.includes('anonymous');
                if (isAnonymous) {
                    return next()
                }

                const { role } = req.loggedInUser;
                if (!role) {
                    const err: any = new Error('Permission denied.')
                    err.statusCode = 403
                    return next(err)
                }

                if (!access.includes(role)) {
                    const err: any = new Error('Permission denied. Forbidden!')
                    err.statusCode = 403
                    return next(err)
                }

                return next();

            } catch (err) {
                next(err)
            }
        }
    }

    return {
        canAccess
    }

})()