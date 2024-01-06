const { Product } = require('../models/Product');

// Function to get sorted and paginated products
const getSortedPaginatedProducts = async (req, res) => {
    try {
        const sortParam = req.query.sort;
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // 10 items per page
        const skip = (page - 1) * limit;
    
        let sortCriteria = {};
        if (sortParam === 'newest') {
          sortCriteria = { createdAt: -1 };
        } else if (sortParam === 'priceLowToHigh') {
          sortCriteria = { price: 1 };
        } else if (sortParam === 'priceHighToLow') {
          sortCriteria = { price: -1 };
        }
    
        const products = await Product.find()
                                      .sort(sortCriteria)
                                      .skip(skip)
                                      .limit(limit);
    
        res.json(products);
      } catch (err) {
        res.status(500).send('Server Error');
      }
};

module.exports = { getSortedPaginatedProducts };
