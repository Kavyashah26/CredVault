const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');  // Authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware');  // Role-based authorization middleware
const {errorHandler} = require('../middlewares/errorHandler');  // Error handling middleware

const router = express.Router();

//done
// Get a project by ID (Protected route)
router.get('/:projectId', authMiddleware,  roleMiddleware(['ADMIN', 'PROJECT_MANAGER']),errorHandler(projectController.getProjectById));

router.post('/:projectId/assign', authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), errorHandler(projectController.assignUserToProject));

router.delete('/:projectId/members/:userId',authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), errorHandler(projectController.removeProjectMember));

// router.get('/:projectId/stats',authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), projectController.getProjectStats);


// ------

// Update a project (Protected route)
router.put('/:projectId', authMiddleware, roleMiddleware('admin', 'project-manager'), errorHandler(projectController.updateProject));

// Delete a project (Protected route)
router.delete('/:projectId', authMiddleware, roleMiddleware(['ADMIN', 'PROJECT_MANAGER']), errorHandler(projectController.deleteProject));

// Assign a user to a project (Protected route)

// Get all users assigned to a project (Protected route)
router.get('/:projectId/users', authMiddleware, errorHandler(projectController.getProjectUsers));

module.exports = router;
