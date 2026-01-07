const express = require('express');
const { Orders } = require('../models/Schema');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all orders (admin only)
router.get('/', adminAuth, async (req, res, next) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Get orders by user (authenticated user only)
router.get('/user/:userId', auth, async (req, res, next) => {
  try {
    // Users can only access their own orders
    if (req.user._id.toString() !== req.params.userId && req.user.userType !== 'Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const orders = await Orders.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Create new order (authenticated user only)
router.post('/', auth, async (req, res, next) => {
  try {
    const orderData = { ...req.body, userId: req.user._id };
    const order = new Orders(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Update order status (admin only)
router.put('/:id', adminAuth, async (req, res, next) => {
  try {
    const order = await Orders.findByIdAndUpdate(
      req.params.id, 
      { orderStatus: req.body.orderStatus }, 
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Cancel order (user can cancel their own orders)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Users can only cancel their own orders, admins can cancel any
    if (order.userId !== req.user._id.toString() && req.user.userType !== 'Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await Orders.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;