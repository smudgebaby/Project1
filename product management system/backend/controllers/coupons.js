// Create a new product
import models from '../models/models.js';
const {Coupon} = models;

const createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).send(coupon);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all products
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.send(coupons);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (!coupon) {
      return res.send({res: 'Invalid Coupon!'});
    }
    res.send(coupon);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a product by ID
const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOneAndUpdate({ code: req.params.code }, req.body, { new: true, runValidators: true });
    if (!coupon) {
      return res.status(404).send();
    }
    res.send(coupon);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOneAndDelete({ code: req.params.code });
    if (!coupon) {
      return res.status(404).send();
    }
    res.send(coupon);
  } catch (error) {
    res.status(500).send(error);
  }
};


export default {
  updateCoupon,
  getCoupon,
  getAllCoupons,
  createCoupon,
  deleteCoupon
}