const express = require('express');
const router = express.Router();
const { getSortedPaginatedProducts } = require('../controllers/productController');

// Define the route for getting sorted and paginated products
router.get('/', getSortedPaginatedProducts);

module.exports = router;