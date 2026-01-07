const express = require('express');
const bcrypt = require('bcryptjs');
const { Admin, User } = require('../models/Schema');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

// User CRUD operations
// Create user
router.post('/users', adminAuth, async (req, res, next) => {
  try {
    const { username, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword, userType });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user: { id: user._id, username, email, userType } });
  } catch (error) {
    next(error);
  }
});

// Update user
router.put('/users/:id', adminAuth, async (req, res, next) => {
  try {
    const { username, email, userType, password } = req.body;
    const updateData = { username, email, userType };
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    next(error);
  }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Get admin settings
router.get('/settings', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ banner: '', categories: ['Fashion', 'Electronics', 'Mobiles', 'Groceries', 'Sports-Equipment'] });
      await admin.save();
    }
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update banner
router.put('/banner', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ banner: req.body.banner, categories: ['Fashion', 'Electronics', 'Mobiles', 'Groceries', 'Sports-Equipment'] });
    } else {
      admin.banner = req.body.banner;
    }
    await admin.save();
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update categories
router.put('/categories', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ banner: '', categories: req.body.categories });
    } else {
      admin.categories = req.body.categories;
    }
    await admin.save();
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;