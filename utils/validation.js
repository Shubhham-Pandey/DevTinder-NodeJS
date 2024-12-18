const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
        throw new Error(`First name & Last name should be alphabets only`);
    } else if(!validator.isEmail(emailId)) {
        throw new Error(`Invalid email address`);
    } else if(!validator.isStrongPassword(password)) {
        throw new Error(`Enter strong password`);
    }
}

module.exports = {
    validateSignUpData
}