const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate('postedBy', 'name email');
  res.json(jobs);
};

const getAllApplications = async (req, res) => {
  const apps = await Application.find()
    .populate('user', 'name email')
    .populate('job', 'title company');
  res.json(apps);
};

module.exports = { getAllUsers, getAllJobs, getAllApplications };
