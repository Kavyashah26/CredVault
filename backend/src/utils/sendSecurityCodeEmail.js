const axios = require('axios');

const sendSecurityCodeEmail = async (email, fingerprint) => {
    console.log(`Sending security code email to ${email} with fingerprint ${fingerprint}`);

    // Call the mail API asynchronously (no `await`)
    axios.post(`${process.env.GOLANG_SERVICE_URL}/api/send-code`, { email })
        .then(response => {
            console.log("Email request sent successfully:", response.data);
        })
        .catch(error => {
            console.log(error);
            console.error("Error sending security code email:", error.response ? error.response.data : error.message);
        });

    // Immediately return success response to user
    return {
        success: true,
        message: "If this email exists, a security code will be sent shortly.",
    };
};


module.exports = {
    sendSecurityCodeEmail,
};
