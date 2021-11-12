const Product = require('../models/productModel');

// Create product :- ADMIN
createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
    } catch (err) {
        console.log(err);
    }
}

// Update product :- ADMIN
updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        let product = await Product.findById(id);
        if (!product) {
            res.status(500).json({
                success: false,
                message: 'Product not found!'
            })
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
    } catch(err) {
        console.log(err);
    }
}

getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        })
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct
}