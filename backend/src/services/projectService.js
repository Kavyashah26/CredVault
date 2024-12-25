// const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

// const prisma = new PrismaClient();

const prisma = require('../utils/prismaClient')
/**
 * Create a new project
 */
const createProject = async (projectData, userId) => {
  const project = await prisma.project.create({
    data: { ...projectData, createdBy: userId },
  });

  // Log activity
  await logger.logActivity({
    userId,
    action: 'CREATE_PROJECT',
    details: `Created project ${projectData.name} in organization ${projectData.organizationId}`,
  });

  return project;
};

/**
 * Get all projects for a specific organization
 */
const getAllProjects = async (organizationId) => {
  const projects = await prisma.project.findMany({
    where: { organizationId },
  });

  return projects;
};

/**
 * Get a single project by its ID
 */
/**
 * Service to get project by ID
 * @param {string} projectId
 * @returns {Object} Project data
 */
// const getProjectByIdService = async (projectId) => {
//   try {
//     // Find the project by its ID
//     const project = await prisma.project.findUnique({
//       where: {
//         id: projectId,
//       },
//     });

//     return project;
//   } catch (error) {
//     console.error('Error in getProjectByIdService:', error);
//     throw new Error('Internal server error');
//   }
// };

const getProjectByIdService = async (projectId) => {
  try {
    // Find the project by its ID along with its members and roles
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        // Include members of the project with their roles
        members: {
          select: {
            userId: true, // Get userId of the member
            role: true, // Get role of the member
            user: {
              select: {
                id: true,
                name: true,
                email: true, // You can include more user details if needed
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    // Return the project along with the members and their roles
    return project;
  } catch (error) {
    console.error('Error in getProjectByIdService:', error);
    throw new Error('Internal server error');
  }
};


/**
 * Update a project
 */
const updateProject = async (projectId, updateData, userId) => {
  const project = await prisma.project.update({
    where: { id: projectId },
    data: updateData,
  });

  // Log activity
  await logger.logActivity({
    userId,
    action: 'UPDATE_PROJECT',
    details: `Updated project ${projectId}`,
  });

  return project;
};

/**
 * Delete a project
 */
const deleteProject = async (projectId, userId) => {
  const project = await prisma.project.delete({
    where: { id: projectId },
  });

  // Log activity
  await logger.logActivity({
    userId,
    action: 'DELETE_PROJECT',
    details: `Deleted project ${projectId}`,
  });

  return project;
};

/**
 * Assign a user to a project
 */
const assignUserToProject = async (projectId, userId) => {
  await prisma.projectUsers.create({
    data: { projectId, userId },
  });

  // Log activity
  await logger.logActivity({
    userId,
    action: 'ASSIGN_USER_TO_PROJECT',
    details: `Assigned user ${userId} to project ${projectId}`,
  });
};

/**
 * Get all users assigned to a project
 */
const getProjectUsers = async (projectId) => {
  const users = await prisma.projectUsers.findMany({
    where: { projectId },
    include: { user: true },
  });

  return users;
};

const addProjectToOrganization = async (organizationId, name, description, actingUserId) => {
  // Step 1: Fetch the organization to ensure it exists and get its creator
  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      creator: true, // Include the creator to check if the acting user is the creator
    },
  });

  if (!organization) {
    throw new Error('Organization not found');
  }

  // Step 2: Check if the acting user is the creator of the organization
  if (organization.creator.id !== actingUserId) {
    throw new Error('Permission denied: Only the organization creator can add projects');
  }

  // Step 3: Create the new project under the organization
  const newProject = await prisma.project.create({
    data: {
      name: name,
      description: description,
      organizationId: organizationId,
      createdBy: actingUserId, // Set the project creator as the acting user
    },
  });

  return newProject;
};
module.exports = {
  createProject,
  getAllProjects,
  getProjectByIdService,
  updateProject,
  deleteProject,
  assignUserToProject,
  getProjectUsers,
  addProjectToOrganization
};
