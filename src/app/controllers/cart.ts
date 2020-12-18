import { Request, Response, NextFunction } from "express";
const globalAny: any = global;

const addToCart = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const product = await globalAny.domain.Product.findOne({
            _id: productId
        }).select('_id price name');

        if (!product) {
            const error: any = new Error("Product not found!");
            error.statudCode = 404;
            return next(error);
        }

        const userCart: any = await globalAny.domain.Cart.findOne({
            customer: req.loggedInUser.customer
        });

        if (!userCart) {
            const error: any = new Error("User cart not found!");
            error.statudCode = 404;
            return next(error);
        }

        const isProductAvailableInCart = await checkProductAvailabiltyAndUpdate(userCart, product, next);

        if (!isProductAvailableInCart) {
            await new globalAny.domain.CartProduct({
                product: productId,
                price: product.price,
                quantity: 1,
                cart: userCart
            }).save();

            let totalPrice = 0;

            if (userCart.totalPrice) {
                totalPrice = parseFloat(userCart.totalPrice) + product.price
            } else {
                totalPrice = product.price
            }
            await globalAny.domain.Cart.findOneAndUpdate({
                _id: userCart._id
            }, {
                totalPrice,
                isEmpty: false
            })
        }

        const response = globalAny.views.JsonView({ message: "Product successfully added to cart!" });
        return res.status(200).json(response)

    } catch (err) {
        next(err)
    }
};

/**
 * 
 * @param { Object }    cart       cart of the logged in customer 
 * @param { Object }    product    current product that customer want to add into his/her cart
 * @param { Function }  callback   next function to throw error, in case any
 * 
 * @description     check if the current product already exists in the customers cart,
 *                  if it's not in the cast returns false,
 *                  if it does exist then update the cart product quantity and price and also the total price of the Cart and returns true.
 */
const checkProductAvailabiltyAndUpdate = async (cart: any, product: any, callback: NextFunction): Promise<Boolean> => {
    try {
        const cartProduct = await globalAny.domain.CartProduct.findOne({
            cart: cart._id,
            product: product._id
        });

        if (!cartProduct) return false

        await globalAny.domain.CartProduct.findOneAndUpdate({
            _id: cartProduct._id
        }, {
            quantity: parseInt(cartProduct.quantity) + 1,
            price: parseFloat(cartProduct.price) + product.price,
        });

        await globalAny.domain.Cart.findOneAndUpdate({
            _id: cart._id
        }, {
            totalPrice: parseFloat(cart.totalPrice) + product.price,
        });

        return true

    } catch (err) {
        callback(err)
        return false
    }
}


export {
    addToCart
}
