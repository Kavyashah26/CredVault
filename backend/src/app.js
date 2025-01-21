// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');  // For security headers
const morgan = require('morgan');  // For logging requests
const compression = require('compression');
// Import routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const credentialRoutes = require('./routes/credentialRoutes');
const tagRoutes = require('./routes/tagRoutes');

// Create an Express app
const app = express();

// Use middlewares
app.use(compression());
app.use(helmet());  // Secure HTTP headers
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse JSON bodies
app.use(morgan('dev'));  // Log requests

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  next();
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/tags', tagRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Working');
});

// Catch-all error handler (if no route matches)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
