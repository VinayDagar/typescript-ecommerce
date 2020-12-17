import { Request, Response, NextFunction } from "express";
const globalAny: any = global;

const createProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        const {
            title,
            price,
            description,
            quantity,
        } = req.body;

        if (!title || !description || !price || !quantity) {
            const error: any = new Error("Bad Request. Product details are required!");
            error.statudCode = 400;
            return next(error);
        }

        const shop: any = await checkIfShopExist(req.loggedInUser._id, next);

        await new globalAny.domain.Product({
            title,
            price,
            description,
            quantity,
            creator: shop._id
        }).save();

        const response: object = globalAny.views.JsonView({ message: "Product sucessfully created!" });
        return res.status(201).json(response);
    } catch (err: any) {
        next(err);
    }
};

const updateProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        const {
            title,
            description,
            price,
            quantity
        } = req.body;

        const shop: any = await checkIfShopExist(req.loggedInUser._id, next);

        await globalAny.domain.Product.findOneAndUpdate({
            _id: req.params.productId
        }, {
            title,
            description,
            price,
            quantity,
            isInStock: parseInt(quantity) > 0 ? true : false
        });

        const response: object = globalAny.views.JsonView({ message: `Product ${title} sucessfully updated!` });
        return res.status(200).json(response);

    } catch (err: any) {
        next(err)
    }
}

const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        await checkIfShopExist(req.loggedInUser._id, next);

        await globalAny.domain.Product.deleteOne({
            _id: req.params.productId
        });

        const response: object = globalAny.views.JsonView({ message: `Product sucessfully deleted!` });
        return res.status(200).json(response);

    } catch (err: any) {
        next(err)
    }
}

const checkIfShopExist = async (userId: string, callback: NextFunction) => {
    try {
        const shop: any = await globalAny.domain.Shop.findOne({
            user: userId
        }).select('_id');

        if (!shop) {
            const error: any = new Error("Permission Denied! Creator not found!");
            error.statudCode = 401;
            return callback(error);
        }
        return shop;
    } catch (err) {
        callback(err)
    }
}

export {
    createProduct,
    updateProduct,
    deleteProduct,
}