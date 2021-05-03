const validate = require('../utils/auth/validate');
const { findbyEmail, findbyUName, createUser, createToken } = require('../db');

const registerUser = async (user) => {
    let emailValidation = validate.ValidateEmail(user.email.toLowerCase());
    let passwordValidation = validate.ValidatePassword(user.password);

    if(user.password.length == 0 || user.firstName.length == 0 || user.lastName.length == 0 || user.email.length == 0){
        return {status: 'Missing fields!'};
    };

    if(emailValidation == false){
        return {status: 'Email'};
    };

    if(passwordValidation == false){
        return {status: 'Password'};
    };

    let unCheck = await findbyUName(user.userName);
    if (unCheck.length > 0) {
        return {status: 'UNRegistered'};
    };

    let userDB = await findbyEmail(user.email);
    if (userDB.length > 0) {
        return {status: 'ERegistered'};
    };

    const newUser = await createUser({
        userName: user.userName.toLowerCase(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email.toLowerCase(),
        password: user.password,
    });

    return { status: 'Success' };
};

module.exports = {
    registerUser
};