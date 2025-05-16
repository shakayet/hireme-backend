const Application = require('../models/Application');
const Invoice = require('../models/Invoice');
const { applyToJobSchema } = require('../validators/applicationSchema');
const { ROLES, APPLICATION_STATUS, PAYMENT_STATUS } = require('../constants');


const applyToJob = async (req, res) => {
  try {
    // Validate input with Zod
    applyToJobSchema.parse(req.body);

    const { jobId } = req.body;

    // Prevent duplicate application
    const exists = await Application.findOne({ job: jobId, user: req.user.id });
    if (exists) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'CV file is required' });
    }

    const filePath = req.file.path;

    // Save application using PAYMENT_STATUS constant
    const application = await Application.create({
      job: jobId,
      user: req.user.id,
      cvUrl: filePath,
      paymentStatus: PAYMENT_STATUS.PAID 
      
    });

    // Save invoice
    await Invoice.create({
      user: req.user.id,
      amount: 100, // Fixed payment amount
      job: jobId
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    const message = error.errors?.[0]?.message || error.message || 'Error submitting application';
    res.status(400).json({ message });
  }
};

module.exports = { applyToJob };
