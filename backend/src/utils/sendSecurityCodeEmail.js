
//     2. create route and controller for code verifcation 
const axios = require('axios');

const sendSecurityCodeEmail = async (email, fingerprint) => {
    console.log(`Sending security code email to ${email} with fingerprint ${fingerprint}`);

    try {
        const response = await axios.post('https://mail-credvault.vercel.app/api/send-code', {
            email: email
        });

        if (response.status === 200) {
            console.log("good golang");
            
            return {
                success: true,
                message: "Security code sent successfully.",
                data: response.data, // Include any additional data if needed
            };
        } else {
            return {
                success: false,
                message: "Failed to send security code. Please try again.",
            };
        }
    } catch (error) {
        console.error('Error sending security code email:', error.response ? error.response.data : error.message);
        return {
            success: false,
            message: "An error occurred while sending the security code.",
            error: error.response ? error.response.data : error.message,
        };
    }
};

module.exports = {
    sendSecurityCodeEmail,
};
