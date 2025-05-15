const express = require('express');
const { protect, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Test route: anyone with token
router.get('/private', protect, (req, res) => {
  res.send(`Hello ${req.user.role}, you are authenticated`);
});

// Admin-only test
router.get('/admin-only', protect, authorizeRole('admin'), (req, res) => {
  res.send('Hello Admin, you have access!');
});

module.exports = router;
