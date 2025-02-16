// src/utilities/golangService.js
const axios = require('axios');
// import axios from 'axios';

// Utility function to generate invite
// const generateInvite = async (orgId, email) => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/invites/send', {
//             orgId,
//             email
//         });

//         return response.data;
//     } catch (error) {
//         console.error('Error in generateInvite utility:', error);
//         throw new Error('Failed to communicate with Golang service');
//     }
// };


const generateInvite = async (orgId, emails,message) => {
    console.log(orgId);
    
    try {
        const response = await axios.post('https://mail-credvault.vercel.app/api/invites/send', {
            orgId,
            emails, // Ensuring it's sent as an array
            message
        });

        return response.data;
    } catch (error) {
        console.error('Error in generateInvite utility:', error.response?.data || error.message);
        throw new Error('Failed to communicate with Golang service');
    }
};



// Utility function to verify invite token
const verifyInviteToken = async (token) => {
    try {
        const response = await axios.post('https://mail-credvault.vercel.app/api/invites/accept', { token });
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
