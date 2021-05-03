const User = require('../models/user');
const Post = require('../models/post');
const Token = require('../models/token');
const crypto = require('crypto');

const findUser = async (user) => {
    const userDB = await User.findById(user);

    return userDB;
};

const findbyUName = async (userName) => {
    const userDB = await User.find({userName: userName});

    return userDB;
};

const findbyEmail = async (email) => {
    const userDB = await User.find({email: email});

    return userDB;
};

const createUser = async (user) => {
    let newUser = await new User({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
    });

    newUser.save();

    return newUser;
};

const createToken = async (newUser) => {
    let token = await new Token({ _userId: newUser.id, token: crypto.randomBytes(16).toString('hex') });
    token.save();

    return token;
};

const findToken = async (user) => {
    let token = await Token.findOne({_userId: user._id});

    return token;
};

const findbyToken = async (token) => {
    let tok = await Token.find({token: token});

    return tok;
};

const deleteToken = async (token) => {
    let tok = Token.deleteOne({token: token});

    return tok;
};

const createPost = async (post) => {
    let newPost = new Post({
        title: post.title,
        content: post.content,
        userID: post.userID,
        image: {
            data: post.image.data,
            contentType: 'image/png'
        }
    });

    newPost.save();
};

const findPost = async (user) => {
    let posts = Post.find({ userID: user } );

    return posts;
};

const addReply = async (reply) => {
    let posts = await Post.findById(reply.postID);

    posts.replies.push({
        content: reply.content,
        username: reply.username
    });

    posts.save();
};

const allUsers = async () => {
    let users = [];
    let userQuery = await User.find({});

    for (let x = 0; x < userQuery.length; x++){
        users.push(userQuery[x].userName);
    };

    return users;
};

const saveMsg = async (data) => {
    let room = await User.find({userName: data.room});

    room[0].messages.push({
        message: data.message,
        user: data.user
    });

    room[0].save()
};

const addLike = async (postID) => {
    let post = await Post.findById(postID);

    post.likes += 1;

    post.save()
};

const saveRepost = async (data) => {
    let repostList = await User.find({userName: data.currentUser});
    let post = await Post.findById(data.postID);

    post.reposts += 1;

    repostList[0].reposts.push({
        postsUser: data.postsUser,
        title: data.title,
        content: data.content,
        image: post.image
    });
    
    post.save();
    repostList[0].save();
};

module.exports = {
    findUser,
    findbyEmail,
    createUser,
    createToken,
    findToken,
    findbyToken,
    deleteToken,
    findbyUName,
    createPost,
    findPost,
    addReply,
    allUsers,
    saveMsg,
    addLike,
    saveRepost
};