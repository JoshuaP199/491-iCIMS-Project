const validate = require('../utils/auth/validate');
const { findbyUName, findbyEmail, findUser, createPost, findPost} = require('../db/index');
//var params = require('../params/params');

// Updates user email
const updateEmail = async (user, email) => {
    const userDB = await findUser(user._id);
    let database_check = await findbyEmail(email);
    let validate_status = validate.ValidateEmail(email);

    if (validate_status == true && userDB.email != email) {

        userDB.email = email;

        try {
            await userDB.save();
            return {status: 'Success'};
        } catch (err){
            console.log(err);
            return {status: 'Failed'};
        }
    } else if (validate_status == false){
        return {status: 'Validate'};
    } else if (database_check != []){
        return {status: 'Registered'};
    } else {
        return {Status: 'Failed'}
    };
};

// Updates user name 
const updateUName = async (user, username) => {
    const userDB = await findUser(user._id);
    let database_check = await findbyUName(username);

    if (database_check.length > 0) {
        return {status: 'Registered'};
    };

    if (user.userName != username) {

        userDB.userName = username;

        try {
            await userDB.save();
            return {status: 'Success'};
        } catch (err){
            console.log(err);
            return {status: 'Failed'};
        }
    } else if (database_check != []){
        return {status: 'Registered'};
    } else {
        return {Status: 'Failed'}
    };
};

// Adds new post
const newPost = async (post) => {
    try {
        await createPost(post);
        return { status: 'Success'};
    } catch { 
        return { status: 'Failed'} 
    };
};

// Renders account view with user data
const getInfo = async (user) => {
    try {
        let posts = await findPost(user._id);
        return { status: 'Success', posts: posts};
    } catch { 
        return { status: 'Failed'} 
    };
};

const searchUser = async (user) => {
    let userDB = await findbyUName(user);
    if (userDB.length < 1 ) { return { status: 'None'} };

    return {status: 'Success'}
};

module.exports = {
    updateEmail,
    updateUName,
    newPost,
    getInfo,
    searchUser
};