const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'manager'],
    default: 'user'
  },
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    appliedCoupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    required: false // assuming an image may not always be present
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  discountValue: {
    type: Number,
    required: true
  },
  validFrom: Date,
  validUntil: Date,
});


const Coupon = mongoose.model('Coupon', couponSchema);
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { User, Product, Coupon };