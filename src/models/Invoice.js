const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, default: 100 },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
