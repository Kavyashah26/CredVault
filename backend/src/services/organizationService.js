const logger = require('../utils/logger');

const prisma = require('../utils/prismaClient')
const golangService= require('../utils/golangService');

// const {sendInvites}= require('../utils/sendInvites')


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

// const addUserToOrganization = async (organizationId, userEmail) => {
//   // Ensure the acting user is allowed to add users (e.g., admin or owner)
//   const actingUser = await prisma.user.findUnique({
//     where: { id: actingUserId },
//   });

//   if (!actingUser) {
//     throw new Error('Acting user not found');
//   }

//   // Fetch the organization to check if it exists and if the acting user is the owner
//   const organization = await prisma.organization.findUnique({
//     where: { id: organizationId },
//     include: {
//       creator: true, // Include owner relation to check if the acting user is the owner
//     },
//   });

//   if (!organization) {
//     throw new Error('Organization not found');
//   }
  
//   // Ensure the acting user is the owner of the organization
//   if (organization.creator?.id !== actingUserId) {
//     throw new Error('Permission denied: Only the organization owner can add users');
//   }

//   // Ensure the user to be added exists
//   const userToAdd = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!userToAdd) {
//     throw new Error('User to be added not found');
//   }

//   // Check if the user is already a member of the organization
//   const existingMembership = await prisma.organizationMember.findFirst({
//     where: {
//       organizationId: organizationId,
//       userId: userId, // Check if user is already a member of the organization
//     },
//   });

//   if (existingMembership) {
//     return { message: 'User is already a member of the organization.' };
//   }

//   // Add the user to the organization (via the relation table)
//   const updatedOrganization = await prisma.organization.update({
//     where: { id: organizationId },
//     data: {
//       members: {
//         create: {
//           userId: userId,
//           role: 'MEMBER', // Define the role for the new member
//         },
//       },
//     },
//   });

//   return updatedOrganization;
// };

const addUserToOrganization = async (organizationId, userEmail) => {

  try {
  // Ensure the user to be added exists
  const userToAdd = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!userToAdd) {
    return {
      success: false,
      message: "User with provided email not found",
    };
  }

  // Check if the organization exists
  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
  });

  if (!organization) {
    return {
      success: false,
      message: "Organization not found",
    };
  }

  // Check if the user is already a member of the organization
  const existingMembership = await prisma.organizationMember.findFirst({
    where: {
      organizationId: organizationId,
      userId: userToAdd.id, // Use the found user's ID
    },
  });

  if (existingMembership) {
    return {
      success: false,
      message: "User is already a member of the organization",
    };
  }
  console.log("I'm trying to add user");
  
  // Add the user to the organization
  const updatedOrganization = await prisma.organization.update({
    where: { id: organizationId },
    data: {
      members: {
        create: {
          userId: userToAdd.id,
          role: 'MEMBER', // Define the role for the new member
        },
      },
    },
  });
  console.log("I'm done adding user");
  
  return {
    success: true,
    message: "User successfully added to the organization",
    data: updatedOrganization,
  };
} catch (error) {
  console.error("Error in addUserToOrganization:", error);
  return {
    success: false,
    message: "Failed to add user to the organization",
    error: error.message,
  };
}
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


const getOrgUserProjects = async (orgId, userId) => {
  const projects = await prisma.project.findMany({
    where: {
      organizationId: orgId,
      members: {
        some: { userId },
      },
    },
    include: {
      organization: {
        select: {
          name: true, 
        },
      },
      members: {
        select: {
          userId: true,
          role: true, // Include the user's role
        },
      },
    },
  });

  return projects.map((project) => {
    const userRole = project.members.find((member) => member.userId === userId)?.role;
    return {
      id: project.id,
      name: project.name,
      description: project.description, 
      orgName: project.organization.name, 
      role: userRole || 'Unknown',
      memberCount: project.members.length,
    };
  });
};



// const inviteToOrganization = async (orgId, emails,message) => {

  
//   try {
//     // Call the Golang service to generate the invite and send the email
//     const response = await golangService.generateInvite(orgId, emails,members);
//     return response;
// } catch (error) {
//     console.error('Error in sendInvite service:', error);
//     throw new Error('Failed to send invite');
// }
// };


const inviteToOrganization = async (orgId, emails, message) => {
  try {
    if (!Array.isArray(emails) || emails.length === 0) {
      throw new Error("Emails should be a non-empty array");
    }

    // Call the Golang service for each email asynchronously
    // const invitePromises = emails.map(email => 
      const response =await golangService.generateInvite(orgId, emails, message)
      if (response.success == true) {
        return {
          success: true,
          message: "Invites sent successfully",
          data: response.data, // Returning actual data from the Golang service
        };
      } else {
        console.error("Unexpected response from Golang service:", response);
        return {
          success: false,
          message: "Invalid response from invite service",
        };
      }
      
    // );

    // Wait for all invitations to be sent
    // const responses = await Promise.allSettled(invitePromises);

    // Process results
    // const successfulInvites = responses
    //   .filter(res => res.status === "fulfilled")
    //   .map(res => res.value);

    // const failedInvites = responses
    //   .filter(res => res.status === "rejected")
    //   .map(res => ({ error: res.reason }));



  } catch (error) {
    console.error("Error in inviteToOrganization service:", error);
    return {
      success: false,
      message: "Failed to send invites",
      error: error.message,
    };
  }
};

const verifyInviteToken = async (token) => {
  try {
      // Call the Golang service to verify the invite token
      const response = await golangService.verifyInviteToken(token);
      // return response;
      if (response.success == true) {
        return {
          success: true,
          message: "verified",
          data: response, // Returning actual data from the Golang service
        };
      } else {
        console.error("Unexpected response from Golang service:", response);
        return {
          success: false,
          message: "Invalid response from invite service",
        };
      }
  } catch (error) {
      console.error('Error in verifyInviteToken service:', error);
      throw new Error('Failed to verify invite token');
  }
};


const updateOrganization = async (orgId, updatedData, userId) => {

  try{
     const updatedOrganization = await prisma.organization.update({
      where: { id: orgId },
      data: {
        name: updatedData.name,
        description: updatedData.description,
      },
      include: {
        members: true,
      },
    });

    return updatedOrganization;
  }catch(error){
    console.error('Error updating organization:', error.message);
    throw new Error(error.message || 'An unexpected error occurred while updating the organization.');
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  addUserToOrganization,
  getOrganizationById,
  deleteOrganizationMember,
  getOrganizationStats,
  getOrgUserProjects,
  inviteToOrganization,
  verifyInviteToken,
  updateOrganization
};
