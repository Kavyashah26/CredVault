const prisma = require('../utils/prismaClient')
const { encrypt, decrypt } = require('../utils/encryption');
const logger = require('../utils/logger');

const CREDENTIAL_SECRET = process.env.CREDENTIAL_SECRET;

const createCredential = async (credentialData, userId, projectId) => {
  try {
    const { name, type, value, description, tags } = credentialData;

    // First, check if the tags already exist in the Tag model
    const existingTags = await prisma.tag.findMany({
      where: {
        name: { in: tags } // Find tags that match the provided names
      }
    });

    // Get the names of the existing tags
    const existingTagNames = existingTags.map(tag => tag.name);

    console.log("existingTagNames",existingTagNames);
    

    // Find tags that don't exist and need to be created
    const newTagNames = tags.filter(tag => !existingTagNames.includes(tag));

    // Create new tags if any are missing
    const newTags = newTagNames.length > 0 ? await prisma.tag.createMany({
      data: newTagNames.map(tag => ({ name: tag })),
      skipDuplicates: true, // Ensure no duplicates are created
    }) : { count: 0, data: [] };

    console.log("newTags", newTags);
    
    const allTags = await prisma.tag.findMany({
      where: {
        name: { in: tags }
      }
    });

    // Combine existing and new tags (get all tag IDs)
    // const allTagIds = [
    //   ...existingTags.map(tag => tag.id),
    //   ...newTags.data.map(tag => tag.id) // Only add created tags if they exist
    // ];

    const allTagIds = allTags.map(tag => tag.id);

    // Create the credential and associate tags (both new and existing)
    const encryptedValue = encrypt(value, CREDENTIAL_SECRET);
    const credential = await prisma.credential.create({
      data: {
        name,
        type,
        value:encryptedValue,
        description,
        project: {
          connect: { id: projectId } // Connect the credential to the project
        },
        creator: {
          connect: { id: userId } // Connect the credential to the user
        },
        tags: {
          create: allTagIds.map(tagId => ({
            tag: {
              connect: { id: tagId } // Create connections between credential and tags
            }
          }))
        }
      }
    });

    return credential;
  } catch (error) {
    console.error('Error creating credential in service:', error);
    throw new Error('Failed to create credential');
  }
};


const getCredentialById = async (credentialId, projectId) => {
  try {
    // Fetch credential by ID and projectId to ensure it's part of the project
    const credential = await prisma.credential.findFirst({
      where: {
        id: credentialId,
        projectId, // Ensure the credential belongs to the project
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!credential) {
      return null; // Return null if the credential is not found
    }

    return {
      id: credential.id,
      name: credential.name,
      type: credential.type,
      description: credential.description,
      createdBy: {
        id: credential.creator.id,
        name: credential.creator.name,
      },
      value: decrypt(credential.value, CREDENTIAL_SECRET)
    };
  } catch (error) {
    console.error('Error fetching credential by ID:', error);
    throw new Error('Failed to fetch credential');
  }
};

const getCredentialsByProject = async (projectId) => {
  try {
    // Fetch credentials by projectId and include creator's name and tags
    const credentials = await prisma.credential.findMany({
      where: { projectId },
      include: {
        creator: {
          select: {
            id: true,
            name: true, // Assuming the User model has a 'name' field
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true, // Assuming the Tag model has a 'name' field
              },
            },
          },
        },
      },
    });

    // Map over the credentials to transform the data
    return credentials.map((cred) => ({
      id: cred.id,
      name: cred.name,
      type: cred.type,
      description: cred.description,
      createdBy: {
        id: cred.creator.id,
        name: cred.creator.name, // Include the creator's name
      },
      tags: cred.tags.map((tagRelation) => ({
        id: tagRelation.tag.id,
        name: tagRelation.tag.name,
      })), // Extract tags from the relation
    }));
  } catch (error) {
    console.error('Error fetching credentials:', error);
    throw new Error('Failed to fetch credentials');
  }
};

const updateCredential = async (id, updateData, userId) => {
  const encryptedValue = updateData.value ? encrypt(updateData.value, CREDENTIAL_SECRET) : undefined;

  const updatedCredential = await prisma.credential.update({
    where: { id },
    data: {
      ...updateData,
      value: encryptedValue,
    },
  });

  // Log activity
  await logger.logActivity({
    userId,
    action: 'UPDATE_CREDENTIAL',
    details: `Updated credential ${id}`,
    projectId: updatedCredential.projectId,
  });

  return updatedCredential;
};

// const deleteCredential = async (id, userId) => {
//   const credential = await prisma.credentials.delete({ where: { id } });

//   // Log activity
//   // await logger.logActivity({
//   //   userId,
//   //   action: 'DELETE_CREDENTIAL',
//   //   details: `Deleted credential ${id}`,
//   //   projectId: credential.projectId,
//   // });

//   return credential;
// };

// const deleteCredential = async (id, userId) => {
//   try {
//     // Fetch credential before deleting to retain projectId
//     const credential = await prisma.credential.findUnique({ where: { id } });

//     if (!credential) {
//       throw new Error(`Credential with ID ${id} not found`);
//     }

//     // Delete the credential
//     await prisma.credential.delete({ where: { id } });

//     // Log activity
//     // await logger.logActivity({
//     //   userId,
//     //   action: 'DELETE_CREDENTIAL',
//     //   details: `Deleted credential ${id}`,
//     //   projectId: credential.projectId,
//     // });

//     return credential; // Returning the fetched credential for reference
//   } catch (error) {
//     console.error(`Error deleting credential: ${error.message}`);
//     throw error; // Rethrow the error to be handled upstream
//   }
// };
const deleteCredential = async (id, userId) => {
  try {
    const credential = await prisma.credential.findUnique({ where: { id } });

    if (!credential) {
      throw new Error(`Credential with ID ${id} not found`);
    }

    // Remove tag associations first (don't delete tags themselves!)
    await prisma.credential.update({
      where: { id },
      data: {
        tags: {
          set: [], // This removes the link only
        },
      },
    });

    // Now delete the credential
    await prisma.credential.delete({
      where: { id },
    });

    return credential;
  } catch (error) {
    console.error(`Error deleting credential: ${error.message}`);
    throw error;
  }
};


// ------------------- for NPM package

const getCredentialByNameInProject = async (name, projectId) => {
  try {
    const credential = await prisma.credential.findFirst({
      where: {
        name,
        projectId,
      },
    });

    if (!credential) return null;

    return {
      value: decrypt(credential.value, CREDENTIAL_SECRET),
    };
  } catch (error) {
    console.error('DB Error in getCredentialByNameInProject:', error.message);
    throw new Error('Database error while fetching credential');
  }
};

module.exports = {
  createCredential,
  getCredentialsByProject,
  updateCredential,
  deleteCredential,
  getCredentialById,

  getCredentialByNameInProject
};
