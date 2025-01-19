const express = require('express');
const credentialController = require('../controllers/credentialController');
const authMiddleware = require('../middlewares/authMiddleware');  // Authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware');  // Role-based authorization middleware
const {errorHandler} = require('../middlewares/errorHandler');  // Error handling middleware
const {checkProjectMembership} = require('../middlewares/membershipMiddleware');

const router = express.Router();

//done
// Create a credential (Protected route)
router.post('/:projectId', authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), errorHandler(credentialController.createCredential));

// Get credentials by project (Protected route)
router.get('/project/:projectId', authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), errorHandler(credentialController.getCredentialsByProject));

router.get(
    '/:projectId/:credentialId',
    authMiddleware,
    checkProjectMembership,
    credentialController.getCredentialById
  );

// -------------




// Update a credential (Protected route)
router.put('/:id', authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), errorHandler(credentialController.updateCredential));

// Delete a credential (Protected route)
router.delete('/:id', authMiddleware, roleMiddleware('admin', 'project-manager'), errorHandler(credentialController.deleteCredential));

module.exports = router;
