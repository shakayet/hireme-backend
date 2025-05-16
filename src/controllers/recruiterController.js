const Application = require('../models/Application');
const Job = require('../models/Job');
const { APPLICATION_STATUS } = require('../constants');

const getMyApplications = async (req, res) => {
  const myJobs = await Job.find({ postedBy: req.user.id }).select('_id');
  const jobIds = myJobs.map(job => job._id);

  const apps = await Application.find({ job: { $in: jobIds } })
    .populate('job', 'title')
    .populate('user', 'name email');

  res.json(apps);
};

const updateApplicationStatus = async (req, res) => {
  const { appId } = req.params;
  const { status } = req.body;

  // ✅ Validate status using constants
  if (!Object.values(APPLICATION_STATUS).includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const app = await Application.findById(appId).populate('job');

  if (!app) return res.status(404).json({ message: 'Application not found' });

  if (app.job.postedBy.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  app.status = status;
  await app.save();

  res.json({ message: `Application ${status}` });
};

module.exports = { getMyApplications, updateApplicationStatus };
