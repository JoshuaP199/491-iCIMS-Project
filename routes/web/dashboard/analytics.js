const express = require('express');
const ensureLoggedIn = require('../../../utils/auth/authLoggedIn').ensureLoggedIn;

const router = express.Router();

router.use(ensureLoggedIn);

router.get('/', (req, res) => { res.render('analytics'); });

module.exports = router;