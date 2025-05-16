const mongoose = require('mongoose');
const { APPLICATION_STATUS, PAYMENT_STATUS } = require('../constants');


const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cvUrl: { type: String, required: true },
    paymentStatus: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        default: PAYMENT_STATUS.PAID,
    }, // mock payment
    status: {
        type: String,
        enum: Object.values(APPLICATION_STATUS),
        default: APPLICATION_STATUS.PENDING,
    }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
