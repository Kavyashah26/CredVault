const axios = require("axios");

const sendInvites = async (orgId, emails) => {
  try {
    // Call the external Golang service using Axios
    const golangServiceUrl = process.env.GOLANG_SERVICE_URL || "http://localhost:8080"; // Replace with your Golang service URL
    const response = await axios.post(`${golangServiceUrl}/invite`, {
      orgId,
      emails, // Pass the orgId and emails as payload
    });

    // Check for a successful response
    if (response.status !== 200) {
      throw new Error("Failed to send invitations from the Golang service");
    }

    return response.data; // Return the response from the Golang service
  } catch (error) {
    console.error("Error in utility while calling Golang service:", error);
    throw error;
  }
};

const acceptInvites=async(token)=>{
  try {
    // Call the external Golang service using Axios
    const golangServiceUrl = process.env.GOLANG_SERVICE_URL || "http://localhost:8080"; // Replace with your Golang service URL
    const response = await axios.post(`${golangServiceUrl}/verify-invite`, {
      token
    });

    // Check for a successful response
    if (response.data.isValid) {
      // throw new Error("Failed to send invitations from the Golang service");
      await addUserToOrganization(response.data.userId, response.data.orgId);
    }

    return response.data; // Return the response from the Golang service
  } catch (error) {
    console.error("Error in utility while calling Golang service:", error);
    throw error;
  }
}

module.exports = {
  sendInvites,
  acceptInvites
};

