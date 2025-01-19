const logger = require('../utils/logger');

const prisma = require('../utils/prismaClient')

const createOrganization = async (organizationData, userId) => {
  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Create the organization and associate the user as the creator
  const organization = await prisma.organization.create({
    data: {
      name: organizationData.name,
      description: organizationData.description,
      createdBy: userId, // Use createdBy to associate the user as the creator
      members: {
        create: [
          {
            userId: userId, // Add the user as a member of the organization
            role: 'ADMIN', // Assign the 'ADMIN' role to the user
          },
        ],
      },
    },
    include: {
      members: true, // Include members in the returned organization data
    },
  });

  return organization;
};

const getAllOrganizations = async (userId) => {

  console.log("getallorg",userId);
  
  const organizations = await prisma.organization.findMany({
    where: {
      OR: [
        { createdBy: userId }, // Organizations created by the user
        { members: { some: { userId } } }, // Organizations where the user is a member
      ],
    },
    include: {
      members: true, // Include members to check the user's role
    },
  });

  // Add the user's role for each organization
  // const enrichedOrganizations = organizations.map((org) => {
  //   // Check if the user is the admin (creator)
  //   const isAdmin = org.createdBy === userId;

  //   // Check if the user is a member
  //   const isMember = org.members.some((member) => member.userId === userId);

  //   return {
  //     ...org,
  //     userRole: isAdmin ? 'admin' : isMember ? 'member' : null, // Assign the role
  //   };
  // });

  // return enrichedOrganizations;

  return organizations.map((org) => {
    // Determine if the user is an admin or member
    const isAdmin = org.createdBy === userId;
    const isMember = org.members.some((member) => member.userId === userId);

    return {
      id: org.id,
      name: org.name,
      userRole: isAdmin ? 'ADMIN' : isMember ? 'MEMBER' : null, // Assign the role
    };
  });

};

const addUserToOrganization = async (organizationId, userId, actingUserId) => {
  // Ensure the acting user is allowed to add users (e.g., admin or owner)
  const actingUser = await prisma.user.findUnique({
    where: { id: actingUserId },
  });

  if (!actingUser) {
    throw new Error('Acting user not found');
  }

  // Fetch the organization to check if it exists and if the acting user is the owner
  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      creator: true, // Include owner relation to check if the acting user is the owner
    },
  });

  if (!organization) {
    throw new Error('Organization not found');
  }
  
  // Ensure the acting user is the owner of the organization
  if (organization.creator?.id !== actingUserId) {
    throw new Error('Permission denied: Only the organization owner can add users');
  }

  // Ensure the user to be added exists
  const userToAdd = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userToAdd) {
    throw new Error('User to be added not found');
  }

  // Check if the user is already a member of the organization
  const existingMembership = await prisma.organizationMember.findFirst({
    where: {
      organizationId: organizationId,
      userId: userId, // Check if user is already a member of the organization
    },
  });

  if (existingMembership) {
    return { message: 'User is already a member of the organization.' };
  }

  // Add the user to the organization (via the relation table)
  const updatedOrganization = await prisma.organization.update({
    where: { id: organizationId },
    data: {
      members: {
        create: {
          userId: userId,
          role: 'MEMBER', // Define the role for the new member
        },
      },
    },
  });

  return updatedOrganization;
};

const getOrganizationById = async (organizationId) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        creator: { select: { id: true, name: true } }, // Include creator info
        members: {
          include: {
            user: {
              select: { id: true, name: true } // Assuming you want to include member names
            }
          }
        }
      }
    });

    return organization;
  } catch (error) {
    console.error('Error in getOrganizationById service:', error);
    throw new Error('Failed to fetch organization details');
  }
};

const deleteOrganizationMember = async (organizationId, userId) => {
  try {
    // Step 1: Remove the user from all projects under this organization
    await prisma.projectMember.deleteMany({
      where: {
        userId: userId, // Remove user from any project they are part of
        project: {
          organizationId: organizationId, // Only affect projects under the specified organization
        },
      },
    });

    // Step 2: Delete the user from the organization
    const deletedMember = await prisma.organizationMember.delete({
      where: {
        organizationId_userId: { // Composite unique constraint for organization-member
          organizationId: organizationId,
          userId: userId,
        },
      },
    });

    if (!deletedMember) {
      return null; // If no member was deleted, return null
    }

    return true; // Member successfully removed from both organization and projects
  } catch (error) {
    console.error('Error in deleteOrganizationMember service:', error);
    throw new Error('Failed to remove member from the organization');
  }
};

// const getOrganizationStats = async (organizationId) => {
//   try {
//     // Get organization stats: number of members, number of projects, and number of credentials
//     const stats = await prisma.organization.findUnique({
//       where: { id: organizationId },
//       select: {
//         id: true,
//         name: true,
//         _count: {
//           select: {
//             members: true,      // Count of members in the organization
//             projects: true,     // Count of projects in the organization
//             credentials: true,  // Count of credentials in the organization
//           },
//         },
//       },
//     });

//     if (!stats) {
//       return null;  // If organization is not found
//     }

//     return {
//       organizationId: stats.id,
//       organizationName: stats.name,
//       memberCount: stats._count.members,
//       projectCount: stats._count.projects,
//       credentialCount: stats._count.credentials,
//     };
//   } catch (error) {
//     console.error('Error in getOrganizationStats service:', error);
//     throw new Error('Failed to fetch organization stats');
//   }
// };

const getOrganizationStats = async (organizationId) => {
  try {
    // Fetch organization details (name, id, etc.)
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!organization) {
      return null; // Return null if the organization is not found
    }

    // Fetch counts for related fields
    const memberCount = await prisma.organizationMember.count({
      where: {
        organizationId: organizationId,
      },
    });

    const projectCount = await prisma.project.count({
      where: {
        organizationId: organizationId,
      },
    });

    const credentialCount = await prisma.credential.count({
      where: {
        project: {
          organizationId: organizationId,
        },
      },
    });

    // Return stats in a structured way
    return {
      organizationId: organization.id,
      organizationName: organization.name,
      memberCount: memberCount,
      projectCount: projectCount,
      credentialCount: credentialCount,
    };
  } catch (error) {
    console.error('Error in getOrganizationStats service:', error);
    throw new Error('Failed to fetch organization stats');
  }
};


module.exports = {
  createOrganization,
  getAllOrganizations,
  addUserToOrganization,
  getOrganizationById,
  deleteOrganizationMember,
  getOrganizationStats
};
