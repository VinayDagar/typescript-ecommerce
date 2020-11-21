import { Request, Response, NextFunction } from "express";
const globalAny: any = global;

const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            phone,
            email,
            password,
        } = req.body;

        const user: any = await new globalAny.domain.User(req.body).save();

        return res.json({ user, message: "user created" })

    } catch (err: any) {
        next(err)
    }
}

export {
    signupController
}
