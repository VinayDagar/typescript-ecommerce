import { NextFunction, Request, Response } from "express";

const globalAny: any = global;

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: any = req.get('x-access-token');

        if (!token) {
            const err: any = new Error('Unauthorized. Token not found!');
            err.statusCode = 401
            return next(err)
        }

        token = token.split(' ')[1];

        if (!token) {
            const err: any = new Error('ACCESS-TOKEN is not formated properly!');
            err.statusCode = 401
            return next(err)
        }

        const { userId, type } = globalAny.configHolder.jwtUtility.verifyToken(token, process.env.APP_SECRET_KEY)

        if (!userId) {
            const err: any = new Error('Unauthorized.');
            err.statusCode = 401
            return next(err)
        }

        const user = await globalAny.domain.User.findOne({
            _id: userId
        })

        if (!user) {
            const error: any = new Error('Unauthorised. user not found!')
            error.statusCode = 401
            return next(error);
        }

        // @ts-ignore
        req.loggedInUser = user
        next()

    } catch (err) {
        err.statusCode = 500;
        next(err)
    }
}