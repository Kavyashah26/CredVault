const logger = require('../utils/logger');

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

const deleteProject = async (projectId, userId) => {
  return await prisma.$transaction(async (prisma) => {
    await prisma.projectMember.deleteMany({ where: { projectId } });
    await prisma.credential.deleteMany({ where: { projectId } });
    await prisma.projectTag.deleteMany({ where: { projectId } });

    const project = await prisma.project.delete({ where: { id: projectId } });

    // await logger.logActivity({
    //   userId,
    //   action: "DELETE_PROJECT",
    //   details: `Deleted project ${projectId}`,
    // });

    return project;
  });
};


// const assignUserToProject = async ({ projectId, userId, role, currentUser }) => {
//   // Step 1: Fetch the project and its associated organization
//   const project = await prisma.project.findUnique({
//     where: { id: projectId },
//     include: { organization: true },
//   });

//   if (!project) {
//     throw new Error('Project not found.');
//   }

//   // Step 2: Validate that the user is part of the organization
//   const organizationMembership = await prisma.organizationMember.findUnique({
//     where: {
//       organizationId_userId: {
//         organizationId: project.organizationId,
//         userId: currentUser.userId, // currentUser represents the logged-in user performing the action
//       },
//     },
//   });

//   if (!organizationMembership) {
//     throw new Error('You are not a member of the organization associated with this project.');
//   }

//   // Step 3: Check if the user performing the action has the right permissions
//   const currentUserProjectMembership = await prisma.projectMember.findUnique({
//     where: {
//       projectId_userId: {
//         projectId,
//         userId: currentUser.userId,
//       },
//     },
//   });
//   console.log(currentUserProjectMembership);
  
//   if (!currentUserProjectMembership) {
//     throw new Error('You are not a member of this project.');
//   }

//   // Only admins can assign any role; project managers can only assign 'member'
//   if (
//     currentUserProjectMembership.role !== 'ADMIN' &&
//     (currentUserProjectMembership.role === 'PROJECT_MANAGER' && role !== 'member')
//   ) {
//     throw new Error(
//       'You do not have permission to assign this role. Project Managers can only assign the "member" role.'
//     );
//   }

//   // Step 4: Check if the target user is already a member of the project
//   const existingProjectMember = await prisma.projectMember.findUnique({
//     where: {
//       projectId_userId: {
//         projectId,
//         userId,
//       },
//     },
//   });

//   if (existingProjectMember) {
//     throw new Error('User is already a member of the project.');
//   }

//   // Step 5: Add the user as a member of the project
//   const newMember = await prisma.projectMember.create({
//     data: {
//       projectId,
//       userId,
//       role,
//     },
//   });

//   return newMember;
// };

const assignUserToProject = async ({ projectId, userId, role, currentUser }) => {
  // Step 1: Fetch the project and its associated organization
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { organization: true },
  });

  if (!project) {
    throw new Error('Project not found.');
  }

  console.log('Current Project:', project);

  // Step 2: Validate that the user is part of the organization
  const organizationMembership = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId: project.organizationId,
        userId: currentUser.userId, // currentUser represents the logged-in user performing the action
      },
    },
  });

  if (!organizationMembership) {
    throw new Error('You are not a member of the organization associated with this project.');
  }

  console.log('Organization Membership:', organizationMembership);

  // Step 3: Allow admins to bypass project membership check
  if (organizationMembership.role === 'ADMIN') {
    console.log('User is an organization-level ADMIN. Bypassing project membership check.');
  } else {
    // Check if the user is a member of the project
    console.log("hello kabuyacfercefr ceer c e rc");
    
    console.log(currentUser.userId, projectId);
    
    const currentUserProjectMembership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: currentUser.userId,
        },
      },
    });

    console.log('Current User Project Membership:', currentUserProjectMembership);

    if (!currentUserProjectMembership) {
      throw new Error('You are not a member of this project.');
    }

    // Only admins can assign any role; project managers can only assign 'member'
    if (
      currentUserProjectMembership.role !== 'ADMIN' &&
      (currentUserProjectMembership.role === 'PROJECT_MANAGER' && role !== 'MEMBER')
    ) {
      throw new Error(
        'You do not have permission to assign this role. Project Managers can only assign the "MEMBER" role.'
      );
    }
  }

  console.log(projectId, userId);
  
  // Step 4: Check if the target user is already a member of the project
  const existingProjectMember = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  if (existingProjectMember) {
    throw new Error('User is already a member of the project.');
  }

  // Step 5: Add the user as a member of the project
  const newMember = await prisma.projectMember.create({
    data: {
      projectId,
      userId,
      role,
    },
  });

  return newMember;
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

// const addProjectToOrganization = async (organizationId, name, description, actingUserId) => {
//   // Step 1: Fetch the organization to ensure it exists and get its creator
//   const organization = await prisma.organization.findUnique({
//     where: { id: organizationId },
//     include: {
//       creator: true, // Include the creator to check if the acting user is the creator
//     },
//   });

//   if (!organization) {
//     throw new Error('Organization not found');
//   }

//   // Step 2: Check if the acting user is the creator of the organization
//   if (organization.creator.id !== actingUserId) {
//     throw new Error('Permission denied: Only the organization creator can add projects');
//   }

//   // Step 3: Create the new project under the organization
//   const newProject = await prisma.project.create({
//     data: {
//       name: name,
//       description: description,
//       organizationId: organizationId,
//       createdBy: actingUserId, // Set the project creator as the acting user
//     },
//   });

//   return newProject;
// };

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

  // Step 4: Add the creator as a member of the project
  await prisma.projectMember.create({
    data: {
      projectId: newProject.id,
      userId: actingUserId,
      role: 'ADMIN', // You can customize the role (e.g., OWNER, ADMIN, etc.)
    },
  });

  return newProject;
};


const removeProjectMember = async (projectId, userId) => {
  try {
    // Check if the user is a member of the project
    const projectMember = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: userId,
        },
      },
    });

    if (!projectMember) {
      return null;  // Return null if the member is not part of the project
    }

    // Remove the member from the project
    await prisma.projectMember.delete({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: userId,
        },
      },
    });

    return true;  // Successfully removed the member
  } catch (error) {
    console.error('Error in removeProjectMember service:', error);
    throw new Error('Failed to remove project member');
  }
};


const getProjectStats = async (projectId) => {
  try {
    // Get project stats: number of members and number of credentials
    const stats = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            members: true,      // Count of members in the project
            credentials: true,  // Count of credentials in the project
          },
        },
      },
    });

    if (!stats) {
      return null;  // If project is not found
    }

    return {
      projectId: stats.id,
      projectName: stats.name,
      memberCount: stats._count.members,
      credentialCount: stats._count.credentials,
    };
  } catch (error) {
    console.error('Error in getProjectStats service:', error);
    throw new Error('Failed to fetch project stats');
  }
};

const assignUsersToProjectBulk = async ({ projectId, users, currentUser }) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { organization: true },
  });

  if (!project) {
    throw new Error('Project not found.');
  }

  const organizationMembership = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId: project.organizationId,
        userId: currentUser.userId,
      },
    },
  });

  if (!organizationMembership) {
    throw new Error('You are not a member of the organization associated with this project.');
  }

  if (organizationMembership.role !== 'ADMIN') {
    const currentUserProjectMembership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: currentUser.userId,
        },
      },
    });

    if (!currentUserProjectMembership) {
      throw new Error('You are not a member of this project.');
    }

    for (const { role } of users) {
      if (
        currentUserProjectMembership.role !== 'ADMIN' &&
        (currentUserProjectMembership.role === 'PROJECT_MANAGER' && role !== 'MEMBER')
      ) {
        throw new Error(
          'You do not have permission to assign this role. Project Managers can only assign the "MEMBER" role.'
        );
      }
    }
  }

  // Check existing members (batch)
  const userIds = users.map(u => u.userId);
  const existingMembers = await prisma.projectMember.findMany({
    where: {
      projectId,
      userId: { in: userIds },
    },
  });

  const existingUserIds = new Set(existingMembers.map(m => m.userId));
  const newMembers = users
    .filter(({ userId }) => !existingUserIds.has(userId))
    .map(({ userId, role }) => ({
      projectId,
      userId,
      role,
    }));

  if (newMembers.length === 0) {
    throw new Error('All provided users are already members of the project.');
  }

  await prisma.projectMember.createMany({
    data: newMembers,
  });

  return newMembers;
};


module.exports = {
  createProject,
  getAllProjects,
  getProjectByIdService,
  updateProject,
  deleteProject,
  assignUserToProject,
  getProjectUsers,
  addProjectToOrganization,
  removeProjectMember,
  getProjectStats,
  assignUsersToProjectBulk
};
