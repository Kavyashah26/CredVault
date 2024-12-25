// src/middlewares/errorHandler.js

const { MongoClient } = require('mongodb');
const config = require('../config/env');

// Helper function to log errors to MongoDB
const logErrorToMongoDB = async (error) => {
  try {
    const client = new MongoClient(config.logDatabaseUrl);
    await client.connect();
    const db = client.db('logs');
    const collection = db.collection('errors');

    await collection.insertOne({
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
    });

    await client.close();
  } catch (err) {
    console.error('Failed to log error to MongoDB:', err.message);
  }
};

// Error handler wrapper function
function errorHandler(fn) {
  return function (req, res, next) {
    // Try to execute the controller function
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Global error handler middleware
function handleError(err, req, res, next) {
  console.error('Error occurred:', err);

  // Log the error to MongoDB
  logErrorToMongoDB(err);

  // Set response status and message
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Send the error response
  res.status(status).json({
    error: {
      message,
      status,
    },
  });
}

module.exports = { errorHandler, handleError };
