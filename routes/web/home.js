const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => { return res.redirect('/login') });

module.exports = router;