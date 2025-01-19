const prisma = require("../utils/prismaClient");

const checkProjectMembership = async (req, res, next) => {
  try {
    const { projectId } = req.params; // Extract projectId from route params
    const userId = req.user.userId; // Extract userId from the authenticated user's data

    // Check if the user is part of the project
    const projectMembership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: { // Composite key for ProjectMember (projectId + userId)
          projectId: projectId,
          userId: userId,
        },
      },
    });

    if (!projectMembership) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to access this project' });
    }

    next(); // User is authorized, proceed to the next middleware/controller
  } catch (error) {
    console.error('Error checking project membership:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = checkProjectMembership;

