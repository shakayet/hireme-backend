const Application = require('../models/Application');

const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id })
      .populate('job', 'title company')
      .sort({ createdAt: -1 });

    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

module.exports = { getMyApplications };
