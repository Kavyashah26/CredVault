const axios = require('axios');

exports.callGoLangService = async (email, code) => {
    try {
        const response = await axios.post(`${process.env.GOLANG_SERVICE_URL}/api/verify-code`, {
            email,
            code
        });

        if (response.status === 200) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error("Error calling GoLang servicey:", error.response ? error.response.data : error.message);
        return { success: false };
    }
};
