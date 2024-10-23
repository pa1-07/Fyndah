const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'adminpassword', // In a real app, you would hash the password
};

// Admin login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided credentials match the admin's credentials
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Create a token that expires in 1 hour
    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
