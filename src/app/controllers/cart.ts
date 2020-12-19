import { Response, NextFunction } from "express";
const globalAny: any = global;

const addToCart = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const { product, userCart } = await checkCustomerCartAndProduct(req.loggedInUser.customer, productId, next);

        if (!product || !userCart) return;

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


const removeItemFromCart = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const { product, userCart } = await checkCustomerCartAndProduct(req.loggedInUser.customer, productId, next);

        if (!product || !userCart) return;

        const cartProduct: any = await globalAny.domain.CartProduct.findOne({
            cart: userCart._id,
            product: product._id
        });

        if (!cartProduct) {
            const error: any = new Error("Product does not exist in your cart!");
            error.statusCode = 404;
            return next(error);
        }

        if (parseInt(cartProduct.quantity) > 1) {
            await globalAny.domain.CartProduct.findOneAndUpdate({
                _id: cartProduct._id
            }, {
                quantity: parseInt(cartProduct.quantity) - 1,
                price: parseFloat(cartProduct.price) - product.price,
            });
        } else if (parseInt(cartProduct.quantity) === 1) {
            await globalAny.domain.CartProduct.deleteOne({
                _id: cartProduct._id
            });
        }

        const cartTotal = parseFloat(userCart.totalPrice) - product.price;

        await globalAny.domain.Cart.findOneAndUpdate({
            _id: userCart._id
        }, {
            totalPrice: cartTotal,
            isEmpty: cartTotal > 0 ? false : true,
        });

        const response: object = globalAny.views.JsonView({ message: "Cart successfully updated!" });

        return res.status(200).json(response);

    } catch (err: any) {
        next(err)
    }
};

const clearCart = async (req: any, res: Response, next: NextFunction) => {
    try {

        const userCart = await globalAny.domain.Cart.findOne({
            customer: req.loggedInUser.customer
        });

        if (!userCart) {
            const error: any = new Error("Cart not found!");
            error.statusCode = 404;
            return next(error);
        }

        await globalAny.domain.CartProduct.deleteMany({
            cart: userCart._id
        });

        await globalAny.domain.Cart.findOneAndUpdate({
            _id: userCart._id
        }, {
            totalPrice: 0,
            isEmpty: true
        });

        const response: Object = globalAny.views.JsonView({
            message: "Cart successfully cleared!", cart: {
                isCartLocked: false,
                totalPrice: 0,
                isEmpty: true,
                cartProducts: []
            }
        });

        return res.status(200).json(response);

    } catch (err) {
        next(err)
    }
}


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


/**
 * 
 * @param { ObjectId } customerId    logged in customer's Id, 
 * @param { ObjectId } productId     Product id to check availablity of the produc in customer's cart    
 * @param { Function } callback      callback function to throw error in case any exception.
 * 
 * @description     Tries to find cart of the logged in customer and the availabilty of the Product
 *                  if exists return the product and cart as usercart, otherwise throw error and return blank object 
 */
const checkCustomerCartAndProduct = async (customerId: string, productId: string, callback: NextFunction): Promise<any> => {
    try {

        const product = await globalAny.domain.Product.findOne({
            _id: productId
        }).select('_id price name');

        const userCart: any = await globalAny.domain.Cart.findOne({
            customer: customerId
        });

        let message: string = !product ? "Product not found!" : "User cart not found!";

        if (!userCart || !product) {
            const error: any = new Error(message);
            error.statudCode = 404;
            callback(error);
            return {}
        }

        return {
            product,
            userCart
        }

    } catch (err) {
        callback(err)
        return {}
    }
}


export {
    addToCart,
    removeItemFromCart,
    clearCart
}
