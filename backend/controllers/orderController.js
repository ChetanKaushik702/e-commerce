const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrorHandler = require('../middleware/catchAsyncError');

// create an order
const newOrder = AsyncErrorHandler(async (req, res, next) => {
    const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    });
})

// get order details
const getSingleOrder = AsyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler('Order not found with this id.', 404));
    }

    res.status(200).json({
        success: true,
        order
    });
})

// get logged in user orders
const myOrders = AsyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });
})

module.exports = {
    newOrder,
    getSingleOrder,
    myOrders
}