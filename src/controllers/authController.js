const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validators/authSchema');
const { ROLES } = require('../constants');

const register = async (req, res) => {
  try {
    // ✅ Zod validation
    registerSchema.parse(req.body);

    const { name, email, password, role } = req.body;

    // Optional: Validate role against constants explicitly
    if (!Object.values(ROLES).includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(400).json({
      message: error.errors?.[0]?.message || 'Invalid input'
    });
  }
};

const login = async (req, res) => {
  try {
    // ✅ Zod validation
    loginSchema.parse(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: error.errors?.[0]?.message || 'Invalid input'
    });
  }
};

module.exports = { register, login };
