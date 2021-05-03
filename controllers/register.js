const { registerUser } = require("../services/register");

const postUser = async (req, res, next) => {
    const userObj = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    try {
        let status = await registerUser(userObj);

        switch(status.status){
            case 'Success':
              req.flash('info', 'Successfully registered!');
              return res.redirect('/login');
            case 'UNRegistered':
              req.flash('error', 'Username already registered.');
              return res.redirect('/register');
            case 'ERegistered':
              req.flash('error', 'Email already registered.');
              return res.redirect('/register');
            case 'Email':
              req.flash('error', 'Invalid email format.');
              return res.redirect('/register');
            case 'Password':
              req.flash('error', 'Password must contain 6 characters, uppercase, lowercase, & a digit.');
              return res.redirect('/register');
            case 'Failed':
              req.flash('error', 'Failed to register');
              return res.redirect('/register');
          };

    } catch(err) {
        console.log(err.message);
        return res.sendStatus(500) && next(err);
    }
};

module.exports = {
    postUser
};