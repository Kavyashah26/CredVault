const organizationService = require('../services/organizationService');

// Create an organization
exports.createOrganization = async (req, res) => {
  try {
    console.log(req.user);

    // Pass userId and request body to the service
    const organization = await organizationService.createOrganization(req.body, req.user.userId);

    res.status(201).json({
      message: 'Organization created successfully. You are now the admin of this organization.',
      organization,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};


// Get all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await organizationService.getAllOrganizations();
    res.status(200).json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a user to an organization
exports.addUserToOrganization = async (req, res) => {
  try {
    const {  userId } = req.body;
    const {organizationId}=req.params;
    await organizationService.addUserToOrganization(organizationId, userId, req.user.userId);
    res.status(200).json({ message: 'User added to organization successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
