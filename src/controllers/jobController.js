const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const { title, company, description, location, salary } = req.body;

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      postedBy: req.user.id // from token
    });

    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error posting job', error });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

module.exports = { createJob, getAllJobs };
