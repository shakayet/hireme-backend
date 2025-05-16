const { z } = require('zod');

const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  salary: z.number({ invalid_type_error: "Salary must be a number" }).positive("Salary must be positive")
});

module.exports = { createJobSchema };
