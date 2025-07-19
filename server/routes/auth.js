const express = require('express');
const bcrypt = require('bcryptjs'); // 🔁 Changed from 'bcrypt' to 'bcryptjs'
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// 🔐 Middleware for token authentication
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// 📝 User Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10); // 🔒 Still works with bcryptjs
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ message: 'Signup failed', error: err });
  }
});

// 🔐 User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // ✅ bcrypt.compare works the same in bcryptjs
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login success' });
  } catch {
    res.status(400).json({ message: 'Login failed' });
  }
});

// 🚪 Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
});

// 👤 Get user details
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select('name email');
  res.json(user);
});

module.exports = router;
