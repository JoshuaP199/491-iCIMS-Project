const express = require('express');
const router = express.Router();
const Cards = require('../../models/cards')

router.get('/cards', (req, res) => {
    try {
        const cards = Cards.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;