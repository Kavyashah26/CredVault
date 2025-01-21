// src/server.js
const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Set up port
const PORT = process.env.PORT || 5000;  // Default to port 5000

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
