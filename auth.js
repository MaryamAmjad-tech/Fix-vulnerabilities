const express = require('express');
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock user DB
const users = [];

// ✅ Register Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!validator.isEmail(email)) {
    return res.status(400).send('Invalid email');
  }

  // 2. Sanitize input
  const cleanEmail = validator.normalizeEmail(email);
  const cleanPassword = validator.escape(password);

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(cleanPassword, 10);

  // 4. Store user
  users.push({ email: cleanEmail, password: hashedPassword });

  res.send('User registered successfully');
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send('User not found');

  // 2. Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send('Incorrect password');

  // 3. Generate token
  const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });

  res.send({ token });
});

module.exports = router;
