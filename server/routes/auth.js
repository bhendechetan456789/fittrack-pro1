const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route – password hash करो
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // User already exists?
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // New user बनाओ + password hash करो
    user = new User({ email, password });

    // ← ये दो लाइनें जरूरी हैं – password hash करने के लिए
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // ↑ ये दो लाइनें

    await user.save();

    // JWT token बनाओ
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login route – password compare सही तरीके से करो
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // User ढूंढो
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Password match check (hashed vs plain)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Token बनाओ
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;