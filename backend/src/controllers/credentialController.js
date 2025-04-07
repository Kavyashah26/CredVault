const credentialService = require('../services/credentialService');
const { decodeToken } = require('../utils/tokenUtils');
const prisma = require('../utils/prismaClient')


// Create a credential
// exports.createCredential = async (req, res) => {
//   try {
//     const credential = await credentialService.createCredential(req.body, req.user.id);
//     res.status(201).json({ message: 'Credential created successfully', credential });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.createCredential = async (req, res) => {
  try {
    // Extract data from the request body and user information from the request object
    const credentialData = req.body;
    const userId = req.user.userId;
    console.log("userid type",typeof userId);
    
    const projectId=req.params.projectId
    // Call the service function to create a credential
    const credential = await credentialService.createCredential(credentialData, userId,projectId);

    // Respond with a success message and the created credential
    res.status(201).json({ message: 'Credential created successfully', credential });
  } catch (error) {
    // Log the error and send an error response
    console.error('Error creating credential:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get credentials by project
exports.getCredentialsByProject = async (req, res) => {
  try {
    const credentials = await credentialService.getCredentialsByProject(req.params.projectId);
    res.status(200).json(credentials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getCredentialById = async (req, res) => {
  try {
    const { credentialId, projectId } = req.params; // Extract credentialId and projectId
    

    // Call the service to fetch the credential
    const credential = await credentialService.getCredentialById(credentialId, projectId);

    if (!credential) {
      return res.status(404).json({ message: 'Credential not found' });
    }

    res.status(200).json(credential); // Send the response
  } catch (error) {
    console.error('Error fetching credential by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Update a credential
exports.updateCredential = async (req, res) => {
  try {
    const updatedCredential = await credentialService.updateCredential(req.params.id, req.body, req.user.id);
    res.status(200).json({ message: 'Credential updated successfully', updatedCredential });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a credential
exports.deleteCredential = async (req, res) => {
  try {
    await credentialService.deleteCredential(req.params.id, req.user.id);
    res.status(200).json({ message: 'Credential deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// ------------------------ for package

exports.getCredentialByNameFromToken = async (req, res) => {
  try {
    const { name } = req.params;
    const token = req.headers.authorization?.split(' ')[1]; // Expects Bearer tok_xxx

    if (!token) {
      return res.status(400).json({ error: 'Missing token in Authorization header' });
    }

    const { projectId, userId } = decodeToken(token);

    // Check if project exists
    const projectExists = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!projectExists) {
      return res.status(404).json({ error: 'Project does not exist' });
    }

    // Check if user is a member of the project
    const isMember = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId,
      },
    });

    if (!isMember) {
      return res.status(403).json({ error: 'User is not a member of this project' });
    }

    // Fetch credential by name for that project
    const credential = await credentialService.getCredentialByNameInProject(name, projectId);

    if (!credential) {
      return res.status(404).json({ error: 'Credential not found in this project' });
    }

    res.status(200).json({ credential });
  } catch (error) {
    console.error('Error fetching credential by name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};