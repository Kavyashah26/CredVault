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

const checkOrganizationMembership = async (req, res, next) => {
    const { organizationId } = req.params;
    const userId = req.user?.userId; // Assuming the user ID is available in `req.user` after authentication
    try {
      // Check if the user is a member of the organization
      const membership = await prisma.organizationMember.findFirst({
        where: {
          organizationId,
          userId,
        },
      });
      console.log("membership" , membership);
      
      if (!membership) {
        return res.status(403).json({ message: 'Access denied: You are not a member of this organization.' });
      }
  
      // Add the membership details to the request object if needed
      req.organizationMembership = membership;
  
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Error checking organization membership:', error);
      res.status(500).json({ message: 'Failed to check organization membership' });
    }
  };
  

module.exports = {checkProjectMembership,
    checkOrganizationMembership
}

