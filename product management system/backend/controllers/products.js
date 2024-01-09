// Create a new product
import models from '../models/models.js';
const {Product} = models;

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};


export default {
  updateProduct,
  getProduct,
  getAllProducts,
  createProduct
}