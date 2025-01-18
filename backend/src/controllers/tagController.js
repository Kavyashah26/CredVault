const tagService = require('../services/tagService');

// Add a new tag
exports.addTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    const tagData = { name, description, createdBy: req.user.id };
    const tag = await tagService.addTag(tagData);
    res.status(201).json({ message: 'Tag added successfully', tag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get tags by credential ID
exports.getTagsByCredential = async (req, res) => {
  try {
    const { credentialId } = req.params;
    const tags = await tagService.getTagsByCredentialId(credentialId);
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Assign a tag to a credential
exports.assignTagToCredential = async (req, res) => {
  try {
    const { credentialId, tagId } = req.body;
    await tagService.assignTagToCredential(credentialId, tagId);
    res.status(200).json({ message: 'Tag assigned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a tag from a credential
exports.removeTagFromCredential = async (req, res) => {
  try {
    const { credentialId, tagId } = req.body;
    await tagService.removeTagFromCredential(credentialId, tagId);
    res.status(200).json({ message: 'Tag removed from credential successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a tag
exports.updateTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const updateData = req.body;
    const tag = await tagService.updateTag(tagId, updateData);
    res.status(200).json({ message: 'Tag updated successfully', tag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a tag
exports.deleteTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    await tagService.deleteTag(tagId);
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
