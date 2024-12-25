// src/config/env.js
import { config as _config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
_config({ path: resolve(__dirname, '../../.env') });

const REQUIRED_ENV_VARS = ['DATABASE_URL', 'JWT_SECRET', 'LOG_DB_URL'];

REQUIRED_ENV_VARS.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

const config = {
  databaseUrl: process.env.DATABASE_URL,
  logDatabaseUrl: process.env.LOG_DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
};

export default config;
