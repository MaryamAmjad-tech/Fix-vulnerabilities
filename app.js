const express = require('express');
const helmet = require('helmet');
const app = express();
const authRoutes = require('./routes/auth');

// Middleware
app.use(helmet()); // Secure headers
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/auth', authRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
