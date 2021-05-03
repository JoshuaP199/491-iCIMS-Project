const fs = require('fs'); 
const path = require('path'); 
const { 
    updateEmail,
    updateUName,
    newPost,
    getInfo,
    searchUser } = require("../services/account");

const postInfo = async (req, res, next) => {
  let user = req.user;

  try {
    let status = await getInfo(user);

    switch(status.status){
      case 'Success':
        return res.render('account', { posts: status.posts });
      case 'Failed':
        req.flash('error', 'Error please try again.');
        return res.redirect('/login');
    };

  } catch(err) {
    console.log(err.message);
    return res.sendStatus(500) && next(err);
  }
};


const postEmail = async (req, res, next) => {
    let user = req.user;
    let email = req.body.email;

    try {
        let status = await updateEmail(user, email);

        switch(status.status){
          case 'Success':
            req.flash('info', 'Email updated');
            return res.redirect('/account');
          case 'Registered':
            req.flash('error', 'Email already registered.');
            return res.redirect('/account');
          case 'Validate':
            req.flash('error', 'Invalid email format.');
            return res.redirect('/account');
          case 'Failed':
            req.flash('error', 'Failed to update email');
            return res.redirect('/account');
        };

    } catch(err){
        console.log(err.message);
        return res.sendStatus(500) && next(err);
    }
};

const postUName = async (req, res, next) => {
  const user = req.user;
  const username = req.body.username;

  try {
      let status = await updateUName(user, username);

      switch(status.status){
        case 'Success':
          req.flash('info', 'Username updated');
          return res.redirect('/account');
        case 'Registered':
          req.flash('error', 'Username already registered.');
          return res.redirect('/account');
        case 'Failed':
          req.flash('error', 'Failed to update username');
          return res.redirect('/account');
      };

  } catch(err){
      console.log(err.message);
      return res.sendStatus(500) && next(err);
  }
};

const postPost = async (req, res, next) => {
  let data;
  try {
    data = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
  } catch(err) {
    data = null;
  };

  let post = {
    title: req.body.title,
    content: req.body.content,
    userID: req.user._id,
    image: { 
      data: data
    } 
  };
  
  try {
    let status = await newPost(post);

    switch(status.status){
      case 'Success':
        req.flash('info', 'Posted!');
        return res.redirect('/account');
      case 'Failed':
        req.flash('error', 'Failed posting');
        return res.redirect('/account');
    };
  } catch(err) {
    console.log(err.message);
    return res.sendStatus(500) && next(err);
  }
};

const searchUsers = async (req, res, next) => {
  let user = req.body.searchUsername;
  
  try {
    let status = await searchUser(user);

    switch(status.status){
        case 'Success':
            return res.redirect('/user/' + user);
        case 'None':
            req.flash('error', 'User doesn\'t exist');
            return res.redirect('/account');
    }
  } catch(err) {
    console.log(err.message);
    return res.sendStatus(500) && next(err);
  }
};


module.exports = { 
    postEmail,
    postUName,
    postPost,
    postInfo,
    searchUsers
};
