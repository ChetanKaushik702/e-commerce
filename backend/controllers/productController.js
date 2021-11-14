const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrorHandler = require('../middlerware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');

// Create product :- ADMIN
createProduct = AsyncErrorHandler(async (req, res, next) => {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
});

// Update product :- ADMIN
updateProduct = AsyncErrorHandler(async (req, res, next) => {
        const id = req.params.id;
        let product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler('Product not found!', 404));
        }
        product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            findAndModify: false
        })
        res.status(200).json({
            success: true,
            product
        })
});

// Delete a product :- ADMIN
deleteProduct = AsyncErrorHandler(async (req, res, next) => {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler('Product not found!', 404));
        }
        await product.remove();
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
        })
});

getAllProducts = AsyncErrorHandler(async (req, res) => {
        const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter();
        
        const products = await apiFeatures.query;
        res.status(200).json({
            success: true,
            products
        })
});

getProductDetails = AsyncErrorHandler(async (req, res, next) => {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler('Product not found!', 404));
        }
        res.status(200).json({
            success: true,
            product
        })
});

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
}