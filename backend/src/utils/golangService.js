
import axios from 'axios';

const generateInvite = async (orgId, emails,message) => {
    console.log(orgId);
    
    try {
        const response = await axios.post(`${process.env.GOLANG_SERVICE_URL}/api/invites/send`, {
            orgId,
            emails, // Ensuring it's sent as an array
            message
        });
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error in generateInvite utility:', error.response?.data || error.message);
        throw new Error('Failed to communicate with Golang service');
    }
};



// Utility function to verify invite token
const verifyInviteToken = async (token) => {
    try {
        const response = await axios.post(`${process.env.GOLANG_SERVICE_URL}/api/invites/accept`, { token });
        console.log("resposnse in utilks",response);
        
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
