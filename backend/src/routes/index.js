// src/routes/index.js
const express = require('express');

const userRoutes = require('./userRoutes');
const organizationRoutes = require('./organizationRoutes');
const projectRoutes = require('./projectRoutes');
const credentialRoutes = require('./credentialRoutes');
const tagRoutes = require('./tagRoutes');

const router = express.Router();

// Mount individual route modules
router.use('/users', userRoutes);
router.use('/organizations', organizationRoutes);
router.use('/projects', projectRoutes);
router.use('/credentials', credentialRoutes);
router.use('/tags', tagRoutes);
router.use(errorHandler);
module.exports = router;
