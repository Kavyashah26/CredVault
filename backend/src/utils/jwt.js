const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

// Secret key (make sure to keep it safe and not hardcoded in production)
const secretKey = jwtSecret;

// Function to generate a JWT token
const generateToken = (userId, role) => {
  const payload = { userId, role };  // Add user data to payload
  const secret = process.env.JWT_SECRET || 'your_default_secret';  // Secret key for signing the JWT

  // Define the expiration as '1h' (1 hour)
  console.log("Hello");
  
  const options = { expiresIn: '1h' };

  // Sign the JWT token with the payload and options
  return jwt.sign(payload, secret, options);
};


// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
