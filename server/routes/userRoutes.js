const express = require('express');
const bcrypt = require('bcryptjs');
const jwtManager = require('../utils/jwtManager');
const { User } = require('../models/Schema');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Server is working', timestamp: new Date() });
});

// Register user
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, userType } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword, userType });
    await user.save();
    
    const token = jwtManager.sign({
      id: user._id, 
      email: user.email, 
      userType: user.userType,
      timestamp: Date.now()
    });
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      token,
      user: { id: user._id, username: user.username, email: user.email, userType: user.userType }
    });
  } catch (error) {
    next(error);
  }
});

// Simple login test
router.post('/login-test', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Test login for:', email);
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    res.json({ 
      userFound: !!user, 
      passwordValid: isValid,
      userType: user.userType 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);
    
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'YES' : 'NO');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password check:', password, 'vs stored hash, result:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const token = jwtManager.sign({
      id: user._id, 
      email: user.email, 
      userType: user.userType,
      timestamp: Date.now()
    });

    res.json({ 
      message: 'Login successful', 
      token,
      user: { id: user._id, username: user.username, email: user.email, userType: user.userType }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout user (client-side token removal)
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Get current user profile
router.get('/profile', auth, (req, res) => {
  res.json({ user: req.user });
});

// Get all users (admin only)
router.get('/', adminAuth, async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;