// Create a new product
import models from '../models/models.js';
const {Product} = models;

const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? req.file.path : undefined
    };

    const product = new Product(productData);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? req.file.path : undefined
    };
    // console.log(productData);
    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPage = async (req, res) =>{
  try {
    const sortParam = req.params.sort;
    const page = parseInt(req.params.page) || 1;
    const info = req.params.info;
    // const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const limit = 10;
    const skip = (page - 1) * limit;
    console.log(sortParam, page);
    let sortCriteria = {};
    switch(sortParam) {
      case 'newest':
        sortCriteria = { createdAt: -1 };
        break;
      case 'lastUpdate':
        sortCriteria = { updatedAt: -1 };
        break;
      case 'priceLowToHigh':
        sortCriteria = { price: 1 };
        break;
      case 'priceHighToLow':
        sortCriteria = { price: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 }; // Default sorting
    }

    let products;
    if (info === '*') {
      products = await Product.find()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);
    } else {
      products = await Product.find({'name': {$regex: info, $options: "i"}})
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);
    }

    // Optionally, return the total number of products for pagination purposes
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send({ message: 'Product successfully deleted', deletedProduct: product });
  } catch (error) {
    res.status(500).send(error);
  }
}

export default {
  updateProduct,
  getProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
  getPage
}