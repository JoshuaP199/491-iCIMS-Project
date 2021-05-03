const express = require('express');

const router = express.Router();

//TODO: Add in error & info

router.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.info = req.flash('info');

    next();
});

router.use('/', require('./home'));
router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/account', require('./account'));
router.use('/cards', require('./cards'));
router.use('/logout', require('./logout'));
router.use('/dashboard', require('./dashboard/dashboard'));
router.use('/analytics', require('./dashboard/analytics'));
router.use('/interview', require('./dashboard/interview'));
router.use('/recommendation', require('./dashboard/recommendation'));
router.use('/wishlist', require('./dashboard/wishlist'));

module.exports = router;