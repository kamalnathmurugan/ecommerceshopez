const express = require('express');
const { Cart } = require('../models/Schema');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get cart items by user (authenticated user only)
router.get('/user/:userId', auth, async (req, res, next) => {
  try {
    // Users can only access their own cart
    if (req.user._id.toString() !== req.params.userId && req.user.userType !== 'Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

// Add item to cart (authenticated user only)
router.post('/', auth, async (req, res, next) => {
  try {
    const cartData = { ...req.body, userId: req.user._id };
    const cartItem = new Cart(cartData);
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
});

// Update cart item quantity (authenticated user only)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    // Users can only update their own cart items
    if (cartItem.userId !== req.user._id.toString() && req.user.userType !== 'Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    cartItem.quantity = req.body.quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

// Remove item from cart (authenticated user only)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    // Users can only delete their own cart items
    if (cartItem.userId !== req.user._id.toString() && req.user.userType !== 'Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
});

// Clear cart for user (authenticated user only)
router.delete('/user/:userId', auth, async (req, res, next) => {
  try {
    // Users can only clear their own cart
    if (req.user._id.toString() !== req.params.userId && req.user.userType !== 'Admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    await Cart.deleteMany({ userId: req.params.userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;