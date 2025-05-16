const express = require('express');
const { getMyApplications } = require('../controllers/seekerController');
const { protect, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/applications', protect, authorizeRole('seeker'), getMyApplications);

module.exports = router;
