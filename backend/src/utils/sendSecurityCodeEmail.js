const sendSecurityCodeEmail = (email, fingerprint) => {
    console.log(`Sending security code email to ${email} with fingerprint ${fingerprint}`);

    //this will call golang service to send mail
    /*task
    1. define golang service
    2. create route and controller for code verifcation 
    3. internally call golang service for this task
    4. 
    */
};

module.exports = {
    sendSecurityCodeEmail,
};

