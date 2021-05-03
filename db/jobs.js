const User = require('../models/user');
const Post = require('../models/post');
const Token = require('../models/token');
const Token = require('../models/cards');
const crypto = require('crypto');

const getJobs = async (user) => {
    const userDB = await Jobs.findById(user);

    return userDB;
};


module.exports = {
    getJobs
};