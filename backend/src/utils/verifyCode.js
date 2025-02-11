const axios = require('axios');

exports.callGoLangService = async (email, code) => {
    try {
        const response = await axios.post('https://mail-credvault.vercel.app/api/verify-code', {
            email,
            code
        });

        if (response.status === 200) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error("Error calling GoLang service:", error.response ? error.response.data : error.message);
        return { success: false };
    }
};
