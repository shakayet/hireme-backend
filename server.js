const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// routes fetching
const authRoutes = require('./src/routes/authRoutes');
const testRoutes = require('./src/routes/testRoutes');
const jobRoutes = require('./src/routes/jobRoutes');

// Api Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/jobs', jobRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('HireMe API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
