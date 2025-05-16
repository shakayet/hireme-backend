const express = require('express');
const { applyToJob } = require('../controllers/applicationController');
const { protect, authorizeRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

// Job Seeker applies to a job
router.post('/apply', protect, authorizeRole('seeker'), upload.single('cv'), applyToJob);

module.exports = router;
