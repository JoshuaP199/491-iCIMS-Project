const express = require('express');

const router = express.Router();

router.use('/register', require('./register'));
router.use('/account', require('./account'));


module.exports = router;