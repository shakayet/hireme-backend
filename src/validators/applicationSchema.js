const { z } = require('zod');

const applyToJobSchema = z.object({
  jobId: z.string().min(1, "Job ID is required")
});

module.exports = { applyToJobSchema };
