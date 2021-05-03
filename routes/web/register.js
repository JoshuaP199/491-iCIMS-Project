const express = require('express');
const register = require('../../controllers/register');

const router = express.Router();

router.get('/', (req, res) => { res.render('register'); });

module.exports = router;