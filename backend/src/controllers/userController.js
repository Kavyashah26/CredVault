const userService = require('../services/userService');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { email, password, role,name } = req.body;
    const user = await userService.registerUser({ email, password, role,name });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login a user

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: 'Invalid credentials. Please check your email and password.',
    });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const user = await userService.updateUserDetails(id, updateData);
    res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    await userService.changePassword(id, newPassword);
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await userService.updateUserRole(id, role);
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get details about the logged-in user
exports.getLoggedInUserDetails = async (req, res) => {
  console.log(("in me"));
  
  try {
    const userId = req.user.userId; // Assuming authMiddleware attaches the logged-in user's ID to `req.user`
    console.log("userId",userId);
    
    const userDetails = await userService.getLoggedInUserDetails(userId);
    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getUserProjects = async (req, res) => {
  try {
    const userId = req.user.userId; // Assumes the authenticated user's ID is available in req.user
    const projects = await userService.getUserProjects(userId);
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user projects.',
    });
  }
};

