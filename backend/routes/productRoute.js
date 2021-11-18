const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, isAuthorizedRole } = require('../middlerware/auth');
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser, isAuthorizedRole('admin'), createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser, isAuthorizedRole('admin'), updateProduct).delete(isAuthenticatedUser, isAuthorizedRole('admin'), deleteProduct);
router.route('/product/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getAllReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;