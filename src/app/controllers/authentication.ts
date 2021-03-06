import { Request, Response, NextFunction } from "express";
const globalAny: any = global;

const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, phone } = req.body;
        const { role } = req.params;

        if (!email || !phone) {
            const error: any = new Error("Invalid body!");
            error.statusCode = 400;

            return next(error);
        }

        if (phone.length != 10) {
            const error: any = new Error("Phone number must be 10 digit!");
            error.statusCode = 400;

            return next(error);
        }

        const previousUser: object = await globalAny.domain.User.findOne({
            $or: [
                {
                    email,
                }, {
                    phone
                }
            ]
        });

        if (previousUser) {
            const error: any = new Error("User already exist!");
            error.statusCode = 404;

            return next(error);
        }

        await new globalAny.domain.User({
            ...req.body,
            role,
        }).save();

        const response: any = globalAny.views.JsonView({ message: "User successfully registered!" })

        return res.json(response)
    } catch (err: any) {
        next(err)
    }
}

const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error: any = new Error("Invalid body!");
            error.statusCode = 401;

            return next(error);
        }

        let user: object = await globalAny.domain.User.findOne({ email }).select('password salt _id');

        if (!user) {
            const error: any = new Error("User does not exist!");
            error.statusCode = 404;

            return next(error);
        }

        const isValid = checkIfPasswordValid(user, password);

        if (!isValid) {
            const err: any = new Error("Email or Password does not match!");
            err.statusCode = 500;

            return next(err);
        }

        await createTokenAndReturn(user, res, next);

    } catch (err: any) {
        next(err)
    }
}

/**
 * 
 * @param user      user who is trying to login  
 * @param password  entered password by user
 * 
 * @description     Tries to match the entered password with user existing password, by creating hash of entered password,
 *                  if both password matches, then return true else fale.  
 */
const checkIfPasswordValid = (user: any, password: string): Boolean => {
    try {
        const hash = globalAny.configHolder.encryptUtility.createHash(password, user.salt);

        return hash === user.password;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * 
 * @param user              User which is trying to login  
 * @param { Object } res    Response object, used in order to send response
 * @param callback          next funcion to throw errors in case any
 * 
 * @description     Tries to generate JWT token using global utility createToken function of globally defined jwtUtility 
 *                  and fetch the complete user and send token and user in response.  
 */
const createTokenAndReturn = async (user: any, res: Response, callback: NextFunction): Promise<Object> => {
    try {
        const payload: object = {
            userId: user._id,
            type: "AUTH_TOKEN",
            meta: {
                "APP_NAME": "ECOMMERCE_TYESCRIPT_NODE"
            }
        }
        const token: string = globalAny.configHolder.jwtUtility.createToken(payload);

        user = await globalAny.domain.User.findOne({ _id: user._id })
            .select('-password -salt -__v')
            .populate({
                path: "customer",
                select: {
                    __v: 0
                },
                populate: {
                    path: "cart",
                    select: {
                        __v: 0
                    }
                }
            })
            .populate({
                path: "wishlist"
            });

        const response: object = globalAny.views.JsonView({ user, token });

        return res.status(200).json(response);
    } catch (err) {
        callback(err)
        return {};
    }
}

export {
    signupController,
    loginController
}
