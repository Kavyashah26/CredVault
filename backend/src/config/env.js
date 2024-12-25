// // src/config/env.js
// const { config } = require('dotenv');
// const { resolve } = require('path');

// // Load environment variables from .env file
// config({ path: resolve(__dirname, '../../.env') });

// const REQUIRED_ENV_VARS = ['DATABASE_URL', 'JWT_SECRET', 'LOG_DB_URL'];

// REQUIRED_ENV_VARS.forEach((varName) => {
//   if (!process.env[varName]) {
//     throw new Error(`Missing required environment variable: ${varName}`);
//   }
// });

// const config = {
//   databaseUrl: process.env.DATABASE_URL,
//   logDatabaseUrl: process.env.LOG_DB_URL,
//   jwtSecret: process.env.JWT_SECRET,
//   port: process.env.PORT || 3000,
// };

// export default config;

// src/config/env.js
const { config } = require('dotenv');
const { resolve } = require('path');

// Load environment variables from .env file
config({ path: resolve(__dirname, '../../.env') });

const REQUIRED_ENV_VARS = ['DATABASE_URL', 'JWT_SECRET', 'LOG_DB_URL'];

REQUIRED_ENV_VARS.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

const configuration = {
  databaseUrl: process.env.DATABASE_URL,
  logDatabaseUrl: process.env.LOG_DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
};

module.exports = configuration;
