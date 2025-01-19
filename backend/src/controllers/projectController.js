const projectService = require('../services/projectService');

// Get a project by ID
// exports.getProjectById = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const project = await projectService.getProjectById(projectId);
//     res.status(200).json(project);
//   } catch (error) {
//     console.error(error.message);
//     res.status(404).json({ error: error.message });
//   }
// };  

exports.getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params; // Get project ID from route parameters

    // Call the service to get the project by ID
    const project = await projectService.getProjectByIdService(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Return the project if found
    res.status(200).json(project);
  } catch (error) {
    console.error('Error in getProjectById controller:', error);
    next(error); // Pass error to the error handling middleware
  }
};
// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updateData = req.body;

    const project = await projectService.updateProject(projectId, updateData, req.user.id);
    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {

  console.log("Hello delete");
  
  try {
    const { projectId } = req.params;

    await projectService.deleteProject(projectId, req.user.userId);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Assign a user to a project
// exports.assignUserToProject = async (req, res) => {
//   // try {
//   //   const { projectId, userId } = req.body;

//   //   await projectService.assignUserToProject(projectId, userId);
//   //   res.status(200).json({ message: 'User assigned to project successfully' });
//   // } catch (error) {
//   //   console.error(error.message);
//   //   res.status(500).json({ error: 'Internal server error' });
//   // }
//   const { projectId } = req.params;
//   const { userId, role } = req.body;

//   try {
//     // Call the service to add a member to the project
//     const result = await projectService.assignUserToProject({ projectId, userId, role });

//     return res.status(200).json({
//       message: 'Member successfully added to the project.',
//       data: result,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message || 'An error occurred while adding the member to the project.',
//     });
//   }
// };
exports.assignUserToProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;
  const currentUser = req.user; // Assuming this is set by authentication middleware
  console.log("useriD", userId);
  
  try {
    const result = await projectService.assignUserToProject({
      projectId,
      userId,
      role,
      currentUser,
    });

    return res.status(200).json({
      message: 'Member successfully added to the project.',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'An error occurred while adding the member to the project.',
    });
  }
};


// Get all users assigned to a project
exports.getProjectUsers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const users = await projectService.getProjectUsers(projectId);
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.addProjectToOrganization = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const { name, description } = req.body;
    const actingUserId = req.user.userId; // Assuming user is authenticated

    // Call the service to add the project to the organization
    const newProject = await projectService.addProjectToOrganization(
      organizationId,
      name,
      description,
      actingUserId
    );

    res.status(201).json({
      message: 'Project added successfully',
      project: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add project' });
  }
};


exports.removeProjectMember = async (req, res) => {
  const { projectId, userId } = req.params;

  try {
    const result = await projectService.removeProjectMember(projectId, userId);

    if (!result) {
      return res.status(404).json({ error: 'Member not found or already removed from the project' });
    }

    res.status(200).json({ message: 'Member removed from the project successfully' });
  } catch (error) {
    console.error('Error removing project member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProjectStats = async (req, res) => {
  const { projectId } = req.params;

  try {
    const stats = await projectService.getProjectStats(projectId);

    if (!stats) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error getting project stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};