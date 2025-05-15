const express = require('express');
const { createJob, getAllJobs } = require('../controllers/jobController');
const { protect, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public: Get all jobs
router.get('/', getAllJobs);

// Employee only: Post a job
router.post('/', protect, authorizeRole('employee'), createJob);

module.exports = router;
