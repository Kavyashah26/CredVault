const express = require('express');
const tagController = require('../controllers/tagController');
const authMiddleware = require('../middlewares/authMiddleware');  // Authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware');  // Role-based authorization middleware
const {errorHandler} = require('../middlewares/errorHandler');  // Error handling middleware

const router = express.Router();

// Add a new tag (Protected route)
router.post('/', authMiddleware, roleMiddleware('admin'), errorHandler(tagController.addTag));

// Get all tags (Protected route)
router.get('/', authMiddleware, roleMiddleware('admin', 'user'), errorHandler(tagController.getAllTags));

// Get tags by credential ID (Protected route)
router.get('/credential/:credentialId', authMiddleware, roleMiddleware('admin', 'user'), errorHandler(tagController.getTagsByCredential));

// Assign a tag to a credential (Protected route)
router.post('/assign', authMiddleware, roleMiddleware('admin'), errorHandler(tagController.assignTagToCredential));

// Remove a tag from a credential (Protected route)
router.delete('/remove', authMiddleware, roleMiddleware('admin'), errorHandler(tagController.removeTagFromCredential));

// Update a tag (Protected route)
router.put('/:tagId', authMiddleware, roleMiddleware('admin'), errorHandler(tagController.updateTag));

// Delete a tag (Protected route)
router.delete('/:tagId', authMiddleware, roleMiddleware('admin'), errorHandler(tagController.deleteTag));

module.exports = router;
