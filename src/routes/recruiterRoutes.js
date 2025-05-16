const express = require('express');
const { getMyApplications, updateApplicationStatus } = require('../controllers/recruiterController');
const { protect, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Must be employee (recruiter)
router.get('/applications', protect, authorizeRole('employee'), getMyApplications);
router.patch('/applications/:appId', protect, authorizeRole('employee'), updateApplicationStatus);

module.exports = router;
