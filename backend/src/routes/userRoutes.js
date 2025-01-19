const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');  // Authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware');  // Role-based authorization middleware
const {errorHandler} = require('../middlewares/errorHandler');  // Error handling middleware

const router = express.Router();

//done
router.get('/me', authMiddleware, errorHandler(userController.getLoggedInUserDetails));
router.post('/register', errorHandler(userController.registerUser));
router.post('/login', errorHandler(userController.loginUser));
router.get('/projects', authMiddleware, errorHandler(userController.getUserProjects));


// Get all users (Protected route, only admin can access this)
router.get('/', authMiddleware, roleMiddleware('admin'), errorHandler(userController.getAllUsers));

// Delete a user (Protected route, only admin can access this)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), errorHandler(userController.deleteUser));

// Update user details (Protected route, only admin or the user themselves can access this)
router.put('/:id', authMiddleware, roleMiddleware('admin', 'user'), errorHandler(userController.updateUserDetails));

// Change user password (Protected route, user must be logged in)
router.put('/:id/password', authMiddleware, errorHandler(userController.changePassword));

// Update user role (Protected route, only admin can access this)
router.put('/:id/role', authMiddleware, roleMiddleware('admin'), errorHandler(userController.updateUserRole));

module.exports = router;
