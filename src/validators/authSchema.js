const { z } = require('zod');
const { ROLES } = require('../constants');

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(Object.values(ROLES), "Invalid role")
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required")
});

module.exports = { registerSchema, loginSchema };
