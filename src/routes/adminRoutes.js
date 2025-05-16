const express = require('express');
const { getAllUsers, getAllJobs, getAllApplications } = require('../controllers/adminController');
const { protect, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Must be admin
router.get('/users', protect, authorizeRole('admin'), getAllUsers);
router.get('/jobs', protect, authorizeRole('admin'), getAllJobs);
router.get('/applications', protect, authorizeRole('admin'), getAllApplications);

module.exports = router;
