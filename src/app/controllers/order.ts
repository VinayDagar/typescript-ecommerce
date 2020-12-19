import { Response, NextFunction } from "express";
const globalAny: any = global;

const createOrder = async (req: any, res: Response, next: NextFunction) => {
    try {

        const { couponCode, expectedDeliveryTime, paymentMode, address } = req.body;

        if (!paymentMode) {
            const error: any = new Error("Bad Request!");
            error.statusCode = 400;
            return next(error);
        }

        const userCart = await globalAny.domain.Cart.findOne({
            customer: req.loggedInUser.customer
        }).select("_id totalPrice");

        if (!userCart) {
            const error: any = new Error("Cart not found!");
            error.statusCode = 404;
            return next(error);
        }

        const cartProducts = await globalAny.domain.CartProduct.find({
            cart: userCart._id
        });

        if (!cartProducts || !cartProducts.length) {
            const error: any = new Error("No product found in your cart!");
            error.statusCode = 404;
            return next(error);
        }

        const orderData = [];
        for (const product of cartProducts) {
            /**
             * @todo create total payable amount, by deducting coupon amount if applied. 
             */
            const data = {
                customer: req.loggedInUser.customer,
                status: "placed",
                expectedDeliveryTime,
                paymentMode,
                total: product.price,
                totalPayable: product.price,
                product: product.product
            }

            const order = await new globalAny.domain.Order(data).save();
            orderData.push(order)
        }

        await globalAny.domain.CartProduct.deleteMany({
            cart: userCart._id
        });

        await globalAny.domain.Cart.findOneAndUpdate({
            _id: userCart._id
        }, {
            isEmpty: true,
            totalPrice: 0
        });

        const response = globalAny.views.JsonView({ message: "order successfully created!", data: orderData })

        return res.status(201).json(response);

    } catch (err) {
        next(err)
    }
}

const updateOrder = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await globalAny.domain.Order.findOne({
            _id: orderId
        })
            .select("_id status paymentMode product")
            .populate({
                path: "product",
                select: "name"
            });

        if (!order) {
            const error: any = new Error("Order not found!");
            error.statusCode = 404;
            return next(error);
        }

        if (!order.customer === req.loggedInUser.customer) {
            const error: any = new Error("Permission denied. You are not authorised. Forbbiden!");
            error.statusCode = 401;
            return next(error);
        }

        await globalAny.domain.Order.findOneAndUpdate({
            _id: order._id
        }, {
            status
        });

        let message: string = "Order successfully updated!";

        if (status === 'cancelled') {
            /**
             * @todo    return payment process if paymentMode is not cash_on_delivery 
             */
            message = `Order ${order?.product?.title} has been cancelled. ${order.paymentMode !== "cod" ? "You will recieve your order amount within 5 working days!" : ""}`;
        }

        const response = globalAny.views.JsonView({ message });
        return res.status(200).json(response);

    } catch (err) {
        next(err)
    }
}

export {
    createOrder,
    updateOrder,
}
