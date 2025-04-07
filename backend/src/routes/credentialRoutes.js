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
    '/:credentialId/project/:projectId',
    authMiddleware,
    checkProjectMembership,
    credentialController.getCredentialById
  );

// -------------




// Update a credential (Protected route)
router.put('/:id/project/:projectId', authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), errorHandler(credentialController.updateCredential));

// Delete a credential (Protected route)
router.delete('/:id/project/:projectId', authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), errorHandler(credentialController.deleteCredential));


// ------------------- for package
router.get('/by-name/:name', errorHandler(credentialController.getCredentialByNameFromToken));




module.exports = router;
