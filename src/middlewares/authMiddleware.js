const jwt = require('jsonwebtoken');
const { ROLES } = require('../constants');

const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const authorizeRole = (...roles) => (req, res, next) => {
  // Use constants here instead of raw strings for better safety
  const allowedRoles = roles.map(role => ROLES[role.toUpperCase()] || role);
  
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient permission' });
  }
  next();
};

module.exports = { protect, authorizeRole };
