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
    const userId = req.user.userId; // Assuming the `authMiddleware` adds the user's ID to `req.user`
    const organizations = await organizationService.getAllOrganizations(userId);
    res.status(200).json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
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

exports.getOrganizationById = async (req, res) => {
  const { organizationId } = req.params;

  try {
    const organization = await organizationService.getOrganizationById(organizationId);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json(organization);
  } catch (error) {
    console.error('Error in getOrganizationById controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteOrganizationMember = async (req, res) => {
  const { organizationId, userId } = req.params;

  try {
    // Check if the member exists in the organization
    const result = await organizationService.deleteOrganizationMember(organizationId, userId);

    if (!result) {
      return res.status(404).json({ message: 'Member not found in the organization' });
    }

    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Error in deleteOrganizationMember controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getOrganizationStats = async (req, res) => {
  const { organizationId } = req.params;

  try {
    const stats = await organizationService.getOrganizationStats(organizationId);

    if (!stats) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error getting organization stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOrgUserProjects = async (req, res) => {
  try {
    const userId = req.user.userId; // Assumes the authenticated user's ID is in req.user
    const orgId = req.params.orgId; // Assumes orgId is passed as a URL parameter

    const projects = await organizationService.getOrgUserProjects(orgId, userId);

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects for the organization.',
    });
  }
};


exports.inviteUserToOrganization=async(req,res)=>{
  const organizationId = req.params.organizationId; // Extract organization ID from the request params
  const { emails,message } = req.body; // Extract emails from the request body (should be an array)
  console.log("My OrgId", organizationId);
  
  if (!emails || !Array.isArray(emails)) {
    return res.status(400).json({ message: "Invalid request. 'emails' must be an array." });
  }

  try {
    // Call the service to handle the invite logic
    const result = await organizationService.inviteToOrganization(organizationId, emails,message);
    if(result.success){
      return res.status(200).json({ result });
    }else{
      return res.status(500).json({ message: "Failed to send invitations", error: "Tjere was some internal issue" });
    }
  } catch (error) {
    console.error("Error inviting users:", error);
    return res.status(500).json({ message: "Failed to send invitations", error: error.message });
  }
}

exports.acceptInvite = async (req, res) => {
  const { token } = req.params;

  try {
      const response = await organizationService.verifyInviteToken(token);

      if (response.success) {
          // Assuming the user is added to the organization here
          // await addUserToOrganization(response.userId, response.orgId);
          // organizationService.addUserToOrganization(organizationId, userId, req.user.userId);
          
          res.status(200).json({ message: 'Successfully added to the organization' });
      } else {
          res.status(400).json({ message: 'Invalid or expired invite' });
      }
  } catch (error) {
      console.error('Error in acceptInvite:', error);
      res.status(500).json({ message: 'Failed to accept invite' });
  }
};