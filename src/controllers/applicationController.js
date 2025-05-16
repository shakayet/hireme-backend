const Application = require('../models/Application');
const Invoice = require('../models/Invoice');

const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Check if user already applied
    const exists = await Application.findOne({ job: jobId, user: req.user.id });
    if (exists) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const filePath = req.file.path;

    // Save application
    const app = await Application.create({
      job: jobId,
      user: req.user.id,
      cvUrl: filePath,
      paymentStatus: 'paid'
    });

    // Save invoice
    await Invoice.create({
      user: req.user.id,
      amount: 100,
      job: jobId
    });

    res.status(201).json({ message: 'Application submitted successfully', application: app });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting application', error: err.message });
  }
};
module.exports = { applyToJob };
