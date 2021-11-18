const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, isAuthorizedRole } = require('../middlerware/auth');
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, isAuthorizedRole('admin'), createProduct);
router.route("/products/:id").put(isAuthenticatedUser, isAuthorizedRole('admin'), updateProduct).delete(isAuthenticatedUser, isAuthorizedRole('admin'), deleteProduct).get(getProductDetails);

module.exports = router;
