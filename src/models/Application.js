const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cvUrl: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'paid' }, // mock payment
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
