import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
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
  }
}, { timestamps: true });


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
  }
}, { timestamps: true });


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
}, { timestamps: true });


const Coupon = mongoose.model('Coupon', couponSchema);
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

export default {User, Product, Coupon};
