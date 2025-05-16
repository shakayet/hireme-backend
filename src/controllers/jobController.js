const Job = require('../models/Job');
const { createJobSchema } = require('../validators/jobSchema');

//  Create job
const createJob = async (req, res) => {
  try {
    createJobSchema.parse(req.body);

    const { title, company, description, location, salary } = req.body;

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      postedBy: req.user.id
    });

    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (error) {
    const message =
      error.errors?.[0]?.message || error.message || 'Error posting job';
    res.status(400).json({ message });
  }
};

//  Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

module.exports = { createJob, getAllJobs };
