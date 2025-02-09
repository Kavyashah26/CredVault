// src/utilities/golangService.js
ol
const axios = require('axios');

// Utility function to generate invite
const generateInvite = async (orgId, email) => {
    try {
        const response = await axios.post('http://localhost:8000/api/invite', {
            orgId,
            email
        });

        return response.data;
    } catch (error) {
        console.error('Error in generateInvite utility:', error);
        throw new Error('Failed to communicate with Golang service');
    }
};

// Utility function to verify invite token
const verifyInviteToken = async (token) => {
    try {
        const response = await axios.post('http://localhost:8000/api/verify-invite', { token });
        return response.data;
    } catch (error) {
        console.error('Error in verifyInviteToken utility:', error);
        throw new Error('Failed to communicate with Golang service');
    }
};

module.exports = {
    generateInvite,
    verifyInviteToken
};
