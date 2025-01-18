// const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

// const prisma = new PrismaClient();

const prisma = require('../utils/prismaClient')
// const createOrganization = async (organizationData, userId) => {
//   // Check if the user exists
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!user) {
//     throw new Error('User not found');
//   }

//   // Create the organization and associate the user as the owner
//   const organization = await prisma.organization.create({
//     data: {
//       name: organizationData.name,
//       description: organizationData.description,
//       owner: {
//         connect: { id: userId }  // Connect the user to the organization as the owner
//       },
//       // You can include other fields like createdAt or updatedAt here, but they are auto-generated
//     }
//   });

//   // Log activity (assuming you have a logger setup for this purpose)
//   // await logger.logActivity({
//   //   userId,
//   //   action: 'CREATE_ORGANIZATION',
//   //   details: `Created organization ${organizationData.name}`,
//   // });

//   return organization;
// };

// const createOrganization = async (organizationData, userId) => {
//   // Check if the user exists
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!user) {
//     throw new Error('User not found');
//   }

//   // Create the organization and associate the user as the owner
//   const organization = await prisma.organization.create({
//     data: {
//       name: organizationData.name,
//       description: organizationData.description,
//       owner: {
//         connect: { id: userId }, // Connect the user to the organization as the owner
//       },
//       members: {
//         create: [
//           {
//             userId: userId, // Add the user as a member of the organization
//             role: 'ADMIN', // Assign the 'ADMIN' role to the user
//           },
//         ],
//       },
//     },
//     include: {
//       members: true, // Include members in the returned organization data
//     },
//   });

//   return organization;
// };

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


// const getAllOrganizations = async () => {
//   const organizations = await prisma.organization.findMany();
//   return organizations;
// };

// const getAllOrganizations = async (userId) => {
//   const organizations = await prisma.organization.findMany({
//     where: {
//       OR: [
//         { createdBy: userId }, // Organizations created by the user
//         { members: { some: { userId } } }, // Organizations where the user is a member
//       ],
//     },
//     include: {
//       members: true, // Include members to identify the role of the user
//     },
//   });

//   // Add the user's role in each organization
//   return organizations.map((org) => {
//     const isAdmin = org.createdBy === userId; // User is admin if they created the organization
//     const isMember = org.members.some((member) => member.userId === userId);

//     return {
//       ...org,
//       userRole: isAdmin ? 'admin' : isMember ? 'member' : null, // Determine the role
//     };
//   });
// };

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

// module.exports = { getAllOrganizations };



// const addUserToOrganization = async (organizationId, userId, actingUserId) => {
//   await prisma.organizationUsers.create({
//     data: { organizationId, userId },
//   });

//   // Log activity
//   await logger.logActivity({
//     userId: actingUserId,
//     action: 'ADD_USER_TO_ORGANIZATION',
//     details: `Added user ${userId} to organization ${organizationId}`,
//   });
// };

// const addUserToOrganization = async (organizationId, userId, actingUserId) => {
//   // Ensure the acting user is allowed to add users (e.g., admin or owner)
//   const actingUser = await prisma.user.findUnique({
//     where: { 
//       id: actingUserId,  // Use the correct id for the acting user
//     },
//   });

//   if (!actingUser) {
//     throw new Error('Acting user not found');
//   }

//   // Fetch the organization to check if it exists and if the acting user is the owner
//   const organization = await prisma.organization.findUnique({
//     where: { id: organizationId },
//     include: {
//       owner: true,  // Include owner relation to check if the acting user is the owner
//     },
//   });

//   if (!organization) {
//     throw new Error('Organization not found');
//   }

//   if (organization.ownerId !== actingUserId) {
//     throw new Error('Permission denied: Only the organization owner can add users');
//   }

//   // Ensure the user to be added exists
//   const userToAdd = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!userToAdd) {
//     throw new Error('User to be added not found');
//   }

//   // Add the user to the organization (via the relation table)
//   const updatedOrganization = await prisma.organization.update({
//     where: { id: organizationId },
//     data: {
//       users: {
//         connect: { id: userId }, // Connect the user to the organization
//       },
//     },
//   });

//   // Optionally log the activity (e.g., using a logger utility)
//   // await logger.logActivity({
//   //   userId: actingUserId,
//   //   action: 'ADD_USER_TO_ORGANIZATION',
//   //   details: `Added user with ID ${userId} to organization ${organizationId}`,
//   // });

//   return updatedOrganization;
// };

// const addUserToOrganization = async (organizationId, userId, actingUserId) => {
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
//       owner: true,  // Include owner relation to check if the acting user is the owner  
//     },
//   });

//   if (!organization) {
//     throw new Error('Organization not found');
//   }

//   if (organization.ownerId !== actingUserId) {
//     throw new Error('Permission denied: Only the organization owner can add users');
//   }

//   // Ensure the user to be added exists
//   const userToAdd = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!userToAdd) {
//     throw new Error('User to be added not found');
//   }

//   // Add the user to the organization (via the relation table)
//   const updatedOrganization = await prisma.organization.update({
//     where: { id: organizationId },
//     data: {
//       users: {
//         connect: { id: userId }, // Correct syntax to connect the user
//       },
//     },
//   });

//   // Optionally log the activity (e.g., using a logger utility)
//   // await logger.logActivity({
//   //   userId: actingUserId,
//   //   action: 'ADD_USER_TO_ORGANIZATION',
//   //   details: `Added user with ID ${userId} to organization ${organizationId}`,
//   // });

//   return updatedOrganization;
// };

// const addUserToOrganization = async (organizationId, userId, actingUserId) => {
//   // Ensure the acting user is allowed to add users (e.g., admin or owner)
//   const actingUser = await prisma.user.findUnique({
//     where: { id: actingUserId },
//   });

//   if (!actingUser) {
//     throw new Error('Acting user not found');
//   }

//   // Fetch the organization to check if it exists and if the acting user is the owner
//   const organization = await prisma.organization.findUnique({
//     where: { id: organizationId }, // Pass organizationId directly as a string
//     include: {
//       creator: true, // Include owner relation to check if the acting user is the owner
//     },
//   });

//   if (!organization) {
//     throw new Error('Organization not found');
//   }
//   console.log("org", organization);
  
//   // Ensure the acting user is the owner of the organization
//   if (organization.creator?.id !== actingUserId) {
//     throw new Error('Permission denied: Only the organization owner can add users');
//   }

//   // Ensure the user to be added exists
//   const userToAdd = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if(userToAdd){
//     return { message: 'User is already a member of the organization.' };
//   }

//   if (!userToAdd) {
//     throw new Error('User to be added not found');
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


module.exports = {
  createOrganization,
  getAllOrganizations,
  addUserToOrganization,
};
