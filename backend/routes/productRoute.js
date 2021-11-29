const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, isAuthorizedRole } = require('../middleware/auth');
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route('/admin/products').get(isAuthenticatedUser, isAuthorizedRole('admin'), getAdminProducts);
router.route("/admin/products/new").post(isAuthenticatedUser, isAuthorizedRole('admin'), createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser, isAuthorizedRole('admin'), updateProduct).delete(isAuthenticatedUser, isAuthorizedRole('admin'), deleteProduct);
router.route('/product/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getAllReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;