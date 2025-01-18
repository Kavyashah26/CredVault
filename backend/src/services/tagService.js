// const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

// const prisma = new PrismaClient();

const prisma = require('../utils/prismaClient')
/**
 * Add a new tag
 */
const addTag = async (tagData) => {
  const tag = await prisma.tag.create({
    data: tagData,
  });

  // Log activity
  await logger.logActivity({
    userId: tagData.createdBy,
    action: 'ADD_TAG',
    details: `Added tag ${tagData.name}`,
  });

  return tag;
};

/**
 * Get all tags
 */
const getAllTags = async () => {
  const tags = await prisma.tag.findMany();
  return tags;
};

/**
 * Get all tags assigned to a credential
 */
const getTagsByCredentialId = async (credentialId) => {
  const tags = await prisma.credentialTags.findMany({
    where: { credentialId },
    include: { tag: true },
  });
  return tags;
};

/**
 * Assign a tag to a credential
 */
const assignTagToCredential = async (credentialId, tagId) => {
  await prisma.credentialTags.create({
    data: { credentialId, tagId },
  });

  // Log activity
  await logger.logActivity({
    userId: tagId, // Assuming tagId refers to the user who created the tag
    action: 'ASSIGN_TAG',
    details: `Assigned tag ${tagId} to credential ${credentialId}`,
  });
};

/**
 * Remove a tag from a credential
 */
const removeTagFromCredential = async (credentialId, tagId) => {
  await prisma.credentialTags.deleteMany({
    where: { credentialId, tagId },
  });

  // Log activity
  await logger.logActivity({
    userId: tagId, // Assuming tagId refers to the user who created the tag
    action: 'REMOVE_TAG',
    details: `Removed tag ${tagId} from credential ${credentialId}`,
  });
};

/**
 * Update a tag
 */
const updateTag = async (tagId, updateData) => {
  const tag = await prisma.tag.update({
    where: { id: tagId },
    data: updateData,
  });

  // Log activity
  await logger.logActivity({
    userId: updateData.updatedBy,
    action: 'UPDATE_TAG',
    details: `Updated tag ${tagId}`,
  });

  return tag;
};

/**
 * Delete a tag
 */
const deleteTag = async (tagId) => {
  const tag = await prisma.tag.delete({
    where: { id: tagId },
  });

  // Log activity
  await logger.logActivity({
    userId: tagId, // Assuming tagId refers to the user who created the tag
    action: 'DELETE_TAG',
    details: `Deleted tag ${tagId}`,
  });

  return tag;
};

module.exports = {
  addTag,
  getAllTags,
  getTagsByCredentialId,
  assignTagToCredential,
  removeTagFromCredential,
  updateTag,
  deleteTag,
};
